import { blogPosts as staticBlogPosts, tours as staticTours } from "@/data/tours";
import {
  findEnquiryCategoryConfig,
  findPreferredContactMethod,
  type ContactEnquiryInput,
} from "@/data/contactEnquiry";
import { siteContact } from "@/data/siteContact";
import { staticShopItems, staticTestimonials } from "@/data/staticSiteContent";
import { requireAdmin } from "@/lib/auth.server";
import { getPool } from "@/lib/db.server";
import type {
  AdminDashboardData,
  BlogPost,
  ContentCategory,
  ManagedTour,
  PublicSiteContent,
  ShopItem,
  Testimonial,
} from "@/lib/content.types";

type GalleryImage = { src: string; alt: string };
type TourItinerary = { time: string; title: string; desc: string };
type TourFaq = { q: string; a: string };

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseJsonColumn<T>(value: unknown, fallback: T): T {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T;
    } catch {
      return fallback;
    }
  }

  if (Buffer.isBuffer(value)) {
    try {
      return JSON.parse(value.toString("utf8")) as T;
    } catch {
      return fallback;
    }
  }

  return value as T;
}

function formatDate(dateString: string | Date) {
  const date = dateString instanceof Date ? dateString : new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(date);
}

function mergeBySlug<T extends { slug: string }>(databaseItems: T[], staticItems: T[]) {
  const seen = new Set<string>();
  const merged: T[] = [];

  for (const item of [...databaseItems, ...staticItems]) {
    const key = item.slug.toLowerCase();
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    merged.push(item);
  }

  return merged;
}

function buildStaticCategories() {
  const unique = new Map<string, ContentCategory>();

  for (const tour of staticTours) {
    const name = tour.category.trim();
    if (!name) {
      continue;
    }

    const slug = slugify(name);
    if (!unique.has(slug)) {
      unique.set(slug, {
        id: -1 * (unique.size + 1),
        name,
        slug,
        description: "",
        source: "static",
      });
    }
  }

  return [...unique.values()];
}

function mapTourRow(row: any): ManagedTour {
  const mainImage = String(row.image || "");
  const gallery = parseJsonColumn<GalleryImage[]>(row.gallery_json, []);
  const resolvedGallery =
    gallery.length > 0
      ? gallery
      : mainImage
        ? [{ src: mainImage, alt: String(row.title || "") }]
        : [];

  return {
    id: Number(row.id),
    categoryId: row.category_id ? Number(row.category_id) : undefined,
    slug: String(row.slug),
    title: String(row.title),
    category: String(row.category_name || row.category_label || ""),
    location: String(row.location || ""),
    duration: String(row.duration || ""),
    difficulty: String(row.difficulty || ""),
    bestFor: String(row.best_for || ""),
    bestSeason: String(row.best_season || ""),
    groupSize: String(row.group_size || ""),
    price: String(row.price || ""),
    image: mainImage,
    gallery: resolvedGallery,
    short: String(row.short_description || ""),
    overview: String(row.overview || ""),
    history: String(row.history || ""),
    highlights: parseJsonColumn<string[]>(row.highlights_json, []),
    itinerary: parseJsonColumn<TourItinerary[]>(row.itinerary_json, []),
    inclusions: parseJsonColumn<string[]>(row.inclusions_json, []),
    exclusions: parseJsonColumn<string[]>(row.exclusions_json, []),
    carry: parseJsonColumn<string[]>(row.carry_json, []),
    whoCanJoin: String(row.who_can_join || ""),
    faqs: parseJsonColumn<TourFaq[]>(row.faqs_json, []),
    notes: parseJsonColumn<string[] | null>(row.notes_json, null) ?? undefined,
    source: "database",
  };
}

function mapBlogRow(row: any): BlogPost {
  return {
    id: Number(row.id),
    slug: String(row.slug),
    title: String(row.title),
    date: formatDate(row.published_on),
    category: String(row.category),
    excerpt: String(row.excerpt),
    content: String(row.content || ""),
    image: String(row.image || ""),
    source: "database",
  };
}

function mapShopRow(row: any): ShopItem {
  return {
    id: Number(row.id),
    slug: String(row.slug),
    image: String(row.image || ""),
    badge: String(row.badge || ""),
    category: String(row.category || ""),
    title: String(row.title || ""),
    price: String(row.price || ""),
    description: String(row.description || ""),
    source: "database",
  };
}

function mapTestimonialRow(row: any): Testimonial {
  return {
    id: Number(row.id),
    name: String(row.name || ""),
    role: String(row.role || ""),
    text: String(row.text || ""),
    source: "database",
  };
}

function mapCategoryRow(row: any): ContentCategory {
  return {
    id: Number(row.id),
    name: String(row.name || ""),
    slug: String(row.slug || ""),
    description: String(row.description || ""),
    source: "database",
  };
}

export async function fetchPublicSiteContent(): Promise<PublicSiteContent> {
  try {
    const pool = await getPool();
    const [tourRows] = await pool.query<any[]>(`
      SELECT cms_tours.*, categories.name AS category_name
      FROM cms_tours
      LEFT JOIN categories ON categories.id = cms_tours.category_id
      ORDER BY cms_tours.updated_at DESC, cms_tours.id DESC
    `);
    const [blogRows] = await pool.query<any[]>(
      "SELECT * FROM blogs ORDER BY published_on DESC, id DESC",
    );
    const [testimonialRows] = await pool.query<any[]>(
      "SELECT * FROM cms_testimonials ORDER BY updated_at DESC, id DESC",
    );
    const [shopRows] = await pool.query<any[]>(
      "SELECT * FROM shop_items ORDER BY updated_at DESC, id DESC",
    );
    const [categoryRows] = await pool.query<any[]>(
      "SELECT * FROM categories ORDER BY name ASC",
    );

    const databaseTours = tourRows.map(mapTourRow);
    const databaseBlogs = blogRows.map(mapBlogRow);
    const databaseTestimonials = testimonialRows.map(mapTestimonialRow);
    const databaseShopItems = shopRows.map(mapShopRow);
    const databaseCategories = categoryRows.map(mapCategoryRow);
    const staticCategories = buildStaticCategories();

    return {
      tours: mergeBySlug(
        databaseTours,
        staticTours.map((tour) => ({ ...tour, source: "static" as const })),
      ),
      blogPosts: mergeBySlug(
        databaseBlogs,
        staticBlogPosts.map((post) => ({ ...post, source: "static" as const })),
      ),
      testimonials: [...databaseTestimonials, ...staticTestimonials],
      shopItems: mergeBySlug(databaseShopItems, staticShopItems),
      categories: mergeBySlug(databaseCategories, staticCategories),
      databaseAvailable: true,
    };
  } catch (error) {
    console.error("Unable to load MySQL content, falling back to static content.", error);

    return {
      tours: staticTours.map((tour) => ({ ...tour, source: "static" as const })),
      blogPosts: staticBlogPosts.map((post) => ({ ...post, source: "static" as const })),
      testimonials: staticTestimonials,
      shopItems: staticShopItems,
      categories: buildStaticCategories(),
      databaseAvailable: false,
    };
  }
}

export async function fetchAdminDashboardData(): Promise<AdminDashboardData> {
  const admin = await requireAdmin({ redirectTo: "/admin/login" });
  const content = await fetchPublicSiteContent();
  return { ...content, admin };
}

export type SaveCategoryInput = {
  id?: number;
  name: string;
  slug?: string;
  description?: string;
};

export type SaveTourInput = {
  id?: number;
  slug?: string;
  title: string;
  categoryId?: number;
  location?: string;
  duration?: string;
  difficulty?: string;
  bestFor?: string;
  bestSeason?: string;
  groupSize?: string;
  price?: string;
  image?: string;
  gallery?: GalleryImage[];
  short?: string;
  overview?: string;
  history?: string;
  highlights?: string[];
  itinerary?: TourItinerary[];
  inclusions?: string[];
  exclusions?: string[];
  carry?: string[];
  whoCanJoin?: string;
  faqs?: TourFaq[];
  notes?: string[];
};

export type SaveTestimonialInput = {
  id?: number;
  name: string;
  role: string;
  text: string;
};

export type SaveShopItemInput = {
  id?: number;
  slug?: string;
  title: string;
  category: string;
  badge?: string;
  price?: string;
  description?: string;
  image?: string;
};

export type SaveBlogPostInput = {
  id?: number;
  slug?: string;
  title: string;
  category: string;
  excerpt: string;
  content?: string;
  image?: string;
  publishedOn?: string;
};

type NormalizedContactEnquiryInput = ReturnType<typeof normalizeContactEnquiryInput>;

function looksLikeEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function countPhoneDigits(value: string) {
  return value.replace(/\D/g, "").length;
}

function normalizeContactEnquiryInput(input: ContactEnquiryInput) {
  const category = findEnquiryCategoryConfig(input.categoryValue);
  if (!category) {
    throw new Error("Please choose a valid enquiry category.");
  }

  const preferredContactMethod = findPreferredContactMethod(input.preferredContactMethod);
  if (!preferredContactMethod) {
    throw new Error("Please choose how you would like us to contact you.");
  }

  const fullName = input.fullName.trim();
  const email = input.email.trim().toLowerCase();
  const phone = input.phone.trim();
  const organizationName = input.organizationName.trim();
  const subject = input.subject.trim();
  const scheduleDetails = input.scheduleDetails.trim();
  const groupDetails = input.groupDetails.trim();
  const locationDetails = input.locationDetails.trim();
  const message = input.message.trim();

  if (fullName.length < 2) {
    throw new Error("Please enter your full name.");
  }

  if (!looksLikeEmail(email)) {
    throw new Error("Please enter a valid email address.");
  }

  if (phone.length > 0 && countPhoneDigits(phone) < 8) {
    throw new Error("Please enter a valid phone or WhatsApp number.");
  }

  if (category.organizationRequired && organizationName.length < 2) {
    throw new Error(`Please enter your ${category.organizationLabel.toLowerCase()}.`);
  }

  if (subject.length < 3) {
    throw new Error(`Please enter your ${category.subjectLabel.toLowerCase()}.`);
  }

  if (scheduleDetails.length < 3) {
    throw new Error(`Please enter your ${category.scheduleLabel.toLowerCase()}.`);
  }

  if (groupDetails.length < 1) {
    throw new Error(`Please enter your ${category.groupLabel.toLowerCase()}.`);
  }

  if (locationDetails.length < 2) {
    throw new Error(`Please enter your ${category.locationLabel.toLowerCase()}.`);
  }

  if (message.length < 12) {
    throw new Error("Please share a few more details so we can guide you properly.");
  }

  return {
    category,
    preferredContactMethod,
    fullName,
    email,
    phone,
    organizationName,
    subject,
    scheduleDetails,
    groupDetails,
    locationDetails,
    message,
  };
}

function getWeb3FormsAccessKey() {
  return (process.env.WEB3FORMS_ACCESS_KEY ?? process.env.VITE_WEB3FORMS_ACCESS_KEY ?? "").trim();
}

function buildContactEnquiryEmailPayload(normalized: NormalizedContactEnquiryInput) {
  return {
    access_key: getWeb3FormsAccessKey(),
    subject: `New Paranjape Tours enquiry from ${normalized.fullName}`,
    from_name: "Paranjape Tours Website",
    replyto: normalized.email,
    name: normalized.fullName,
    email: normalized.email,
    phone: normalized.phone || "Not provided",
    enquiry_category: normalized.category.label,
    preferred_contact_method: normalized.preferredContactMethod.label,
    organization_name: normalized.organizationName || "Not provided",
    enquiry_subject: normalized.subject,
    schedule_details: normalized.scheduleDetails,
    group_details: normalized.groupDetails,
    location_details: normalized.locationDetails,
    message: normalized.message,
  };
}

async function sendContactEnquiryEmail(normalized: NormalizedContactEnquiryInput) {
  const accessKey = getWeb3FormsAccessKey();
  if (!accessKey) {
    return { skipped: true };
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(buildContactEnquiryEmailPayload(normalized)),
  });

  const result = await response.json().catch(() => null);
  const message =
    result?.message ??
    result?.body?.message ??
    "We couldn't send your enquiry email right now.";

  if (!response.ok || result?.success === false) {
    throw new Error(message);
  }

  return result;
}

async function getCategoryLabel(categoryId?: number) {
  if (!categoryId) {
    return "";
  }

  const pool = await getPool();
  const [rows] = await pool.execute<any[]>(
    "SELECT name FROM categories WHERE id = ? LIMIT 1",
    [categoryId],
  );

  if (!rows.length) {
    throw new Error("Selected category does not exist anymore.");
  }

  return String(rows[0].name);
}

export async function upsertCategory(input: SaveCategoryInput) {
  await requireAdmin();
  const pool = await getPool();

  const name = input.name.trim();
  const slug = slugify(input.slug?.trim() || name);
  const description = input.description?.trim() ?? "";

  if (!name) {
    throw new Error("Category name is required.");
  }

  if (!slug) {
    throw new Error("Category slug is required.");
  }

  if (input.id) {
    await pool.execute(
      "UPDATE categories SET name = ?, slug = ?, description = ? WHERE id = ?",
      [name, slug, description, input.id],
    );
  } else {
    await pool.execute(
      "INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)",
      [name, slug, description],
    );
  }
}

export async function deleteCategoryById(id: number) {
  await requireAdmin();
  const pool = await getPool();
  const [rows] = await pool.execute<any[]>(
    "SELECT COUNT(*) AS count FROM cms_tours WHERE category_id = ?",
    [id],
  );

  if (Number(rows[0]?.count ?? 0) > 0) {
    throw new Error("This category is used by a tour. Update the tour first, then delete the category.");
  }

  await pool.execute("DELETE FROM categories WHERE id = ?", [id]);
}

export async function upsertTour(input: SaveTourInput) {
  await requireAdmin();
  const pool = await getPool();

  const title = input.title.trim();
  const slug = slugify(input.slug?.trim() || title);

  if (!title) {
    throw new Error("Tour title is required.");
  }

  if (!slug) {
    throw new Error("Tour slug is required.");
  }

  const categoryLabel = await getCategoryLabel(input.categoryId);
  const image = input.image?.trim() ?? "";
  const gallery = input.gallery?.filter((item) => item.src.trim()) ?? [];

  const values = [
    slug,
    title,
    input.categoryId ?? null,
    categoryLabel,
    input.location?.trim() ?? "",
    input.duration?.trim() ?? "",
    input.difficulty?.trim() ?? "",
    input.bestFor?.trim() ?? "",
    input.bestSeason?.trim() ?? "",
    input.groupSize?.trim() ?? "",
    input.price?.trim() ?? "",
    image,
    JSON.stringify(gallery),
    input.short?.trim() ?? "",
    input.overview?.trim() ?? "",
    input.history?.trim() ?? "",
    JSON.stringify(input.highlights ?? []),
    JSON.stringify(input.itinerary ?? []),
    JSON.stringify(input.inclusions ?? []),
    JSON.stringify(input.exclusions ?? []),
    JSON.stringify(input.carry ?? []),
    input.whoCanJoin?.trim() ?? "",
    JSON.stringify(input.faqs ?? []),
    JSON.stringify(input.notes?.length ? input.notes : null),
  ];

  if (input.id) {
    await pool.execute(
      `
        UPDATE cms_tours
        SET
          slug = ?,
          title = ?,
          category_id = ?,
          category_label = ?,
          location = ?,
          duration = ?,
          difficulty = ?,
          best_for = ?,
          best_season = ?,
          group_size = ?,
          price = ?,
          image = ?,
          gallery_json = ?,
          short_description = ?,
          overview = ?,
          history = ?,
          highlights_json = ?,
          itinerary_json = ?,
          inclusions_json = ?,
          exclusions_json = ?,
          carry_json = ?,
          who_can_join = ?,
          faqs_json = ?,
          notes_json = ?
        WHERE id = ?
      `,
      [...values, input.id],
    );
  } else {
    await pool.execute(
      `
        INSERT INTO cms_tours (
          slug,
          title,
          category_id,
          category_label,
          location,
          duration,
          difficulty,
          best_for,
          best_season,
          group_size,
          price,
          image,
          gallery_json,
          short_description,
          overview,
          history,
          highlights_json,
          itinerary_json,
          inclusions_json,
          exclusions_json,
          carry_json,
          who_can_join,
          faqs_json,
          notes_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      values,
    );
  }
}

export async function deleteTourById(id: number) {
  await requireAdmin();
  const pool = await getPool();
  await pool.execute("DELETE FROM cms_tours WHERE id = ?", [id]);
}

export async function upsertTestimonial(input: SaveTestimonialInput) {
  await requireAdmin();
  const pool = await getPool();
  const name = input.name.trim();
  const role = input.role.trim();
  const text = input.text.trim();

  if (!name || !text) {
    throw new Error("Testimonial name and text are required.");
  }

  if (input.id) {
    await pool.execute(
      "UPDATE cms_testimonials SET name = ?, role = ?, text = ? WHERE id = ?",
      [name, role, text, input.id],
    );
  } else {
    await pool.execute(
      "INSERT INTO cms_testimonials (name, role, text) VALUES (?, ?, ?)",
      [name, role, text],
    );
  }
}

export async function deleteTestimonialById(id: number) {
  await requireAdmin();
  const pool = await getPool();
  await pool.execute("DELETE FROM cms_testimonials WHERE id = ?", [id]);
}

export async function upsertShopItem(input: SaveShopItemInput) {
  await requireAdmin();
  const pool = await getPool();
  const title = input.title.trim();
  const slug = slugify(input.slug?.trim() || title);

  if (!title || !slug) {
    throw new Error("Shop item title is required.");
  }

  const values = [
    slug,
    title,
    input.category.trim(),
    input.badge?.trim() ?? "",
    input.price?.trim() ?? "",
    input.description?.trim() ?? "",
    input.image?.trim() ?? "",
  ];

  if (input.id) {
    await pool.execute(
      `
        UPDATE shop_items
        SET
          slug = ?,
          title = ?,
          category = ?,
          badge = ?,
          price = ?,
          description = ?,
          image = ?
        WHERE id = ?
      `,
      [...values, input.id],
    );
  } else {
    await pool.execute(
      `
        INSERT INTO shop_items (slug, title, category, badge, price, description, image)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      values,
    );
  }
}

export async function deleteShopItemById(id: number) {
  await requireAdmin();
  const pool = await getPool();
  await pool.execute("DELETE FROM shop_items WHERE id = ?", [id]);
}

export async function upsertBlogPost(input: SaveBlogPostInput) {
  await requireAdmin();
  const pool = await getPool();
  const title = input.title.trim();
  const slug = slugify(input.slug?.trim() || title);

  if (!title || !slug) {
    throw new Error("Blog title is required.");
  }

  const publishedOn = input.publishedOn?.trim() || new Date().toISOString().slice(0, 10);
  const values = [
    slug,
    title,
    input.category.trim(),
    input.excerpt.trim(),
    input.content?.trim() ?? "",
    input.image?.trim() ?? "",
    publishedOn,
  ];

  if (input.id) {
    await pool.execute(
      `
        UPDATE blogs
        SET slug = ?, title = ?, category = ?, excerpt = ?, content = ?, image = ?, published_on = ?
        WHERE id = ?
      `,
      [...values, input.id],
    );
  } else {
    await pool.execute(
      "INSERT INTO blogs (slug, title, category, excerpt, content, image, published_on) VALUES (?, ?, ?, ?, ?, ?, ?)",
      values,
    );
  }
}

export async function deleteBlogPostById(id: number) {
  await requireAdmin();
  const pool = await getPool();
  await pool.execute("DELETE FROM blogs WHERE id = ?", [id]);
}

async function createContactEnquiryRecord(normalized: NormalizedContactEnquiryInput) {
  try {
    const pool = await getPool();
    const [result] = await pool.execute<any>(
      `
        INSERT INTO contact_enquiries (
          category_value,
          category_label,
          full_name,
          email,
          phone,
          preferred_contact_method,
          organization_name,
          subject,
          schedule_details,
          group_details,
          location_details,
          message
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        normalized.category.value,
        normalized.category.label,
        normalized.fullName,
        normalized.email,
        normalized.phone,
        normalized.preferredContactMethod.value,
        normalized.organizationName,
        normalized.subject,
        normalized.scheduleDetails,
        normalized.groupDetails,
        normalized.locationDetails,
        normalized.message,
      ],
    );

    return {
      success: true,
      enquiryId: Number(result?.insertId ?? 0),
      categoryLabel: normalized.category.label,
    };
  } catch (error) {
    console.error("Unable to save contact enquiry.", error);
    throw new Error(
      `We couldn't save your enquiry right now. Please email ${siteContact.email} or call ${siteContact.primaryPhone}.`,
    );
  }
}

export async function createContactEnquiry(input: ContactEnquiryInput) {
  return createContactEnquiryRecord(normalizeContactEnquiryInput(input));
}

export async function submitPublicContactEnquiry(input: ContactEnquiryInput) {
  const normalized = normalizeContactEnquiryInput(input);
  const [databaseResult, emailResult] = await Promise.allSettled([
    createContactEnquiryRecord(normalized),
    sendContactEnquiryEmail(normalized),
  ]);

  const savedToDatabase = databaseResult.status === "fulfilled";
  const sentToEmail =
    emailResult.status === "fulfilled" &&
    !(typeof emailResult.value === "object" && emailResult.value?.skipped);

  if (!savedToDatabase && !sentToEmail) {
    const databaseMessage =
      databaseResult.status === "rejected"
        ? databaseResult.reason instanceof Error
          ? databaseResult.reason.message
          : "We couldn't save your enquiry."
        : "";
    const emailMessage =
      emailResult.status === "rejected"
        ? emailResult.reason instanceof Error
          ? emailResult.reason.message
          : "We couldn't send your enquiry email."
        : "";

    throw new Error(emailMessage || databaseMessage || "We couldn't submit your enquiry right now.");
  }

  return {
    success: true,
    savedToDatabase,
    sentToEmail,
    enquiryId: databaseResult.status === "fulfilled" ? Number(databaseResult.value?.enquiryId ?? 0) : 0,
  };
}
