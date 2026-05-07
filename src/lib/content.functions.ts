import { createServerFn } from "@tanstack/react-start";
import { loginWithCredentials, logoutCurrentAdmin, requireAdmin } from "@/lib/auth.server";
import {
  deleteBlogPostById,
  deleteCategoryById,
  deleteShopItemById,
  deleteTestimonialById,
  deleteTourById,
  fetchAdminDashboardData,
  fetchPublicSiteContent,
  type SaveBlogPostInput,
  type SaveCategoryInput,
  type SaveShopItemInput,
  type SaveTestimonialInput,
  type SaveTourInput,
  upsertBlogPost,
  upsertCategory,
  upsertShopItem,
  upsertTestimonial,
  upsertTour,
} from "@/lib/content.server";

export const getPublicSiteContent = createServerFn({ method: "GET" }).handler(async () => {
  return fetchPublicSiteContent();
});

export const getAdminDashboardContent = createServerFn({ method: "GET" }).handler(async () => {
  return fetchAdminDashboardData();
});

export const getAdminSessionState = createServerFn({ method: "GET" }).handler(async () => {
  const admin = await requireAdmin().catch(() => null);
  return { authenticated: Boolean(admin), admin };
});

export const loginAdmin = createServerFn({ method: "POST" })
  .inputValidator((data: { username: string; password: string }) => data)
  .handler(async ({ data }) => {
    return loginWithCredentials(data.username.trim(), data.password);
  });

export const logoutAdmin = createServerFn({ method: "POST" }).handler(async () => {
  await logoutCurrentAdmin();
  return { success: true };
});

export const saveCategory = createServerFn({ method: "POST" })
  .inputValidator((data: SaveCategoryInput) => data)
  .handler(async ({ data }) => {
    await upsertCategory(data);
    return { success: true };
  });

export const deleteCategory = createServerFn({ method: "POST" })
  .inputValidator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    await deleteCategoryById(data.id);
    return { success: true };
  });

export const saveTour = createServerFn({ method: "POST" })
  .inputValidator((data: SaveTourInput) => data)
  .handler(async ({ data }) => {
    await upsertTour(data);
    return { success: true };
  });

export const deleteTour = createServerFn({ method: "POST" })
  .inputValidator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    await deleteTourById(data.id);
    return { success: true };
  });

export const saveTestimonial = createServerFn({ method: "POST" })
  .inputValidator((data: SaveTestimonialInput) => data)
  .handler(async ({ data }) => {
    await upsertTestimonial(data);
    return { success: true };
  });

export const deleteTestimonial = createServerFn({ method: "POST" })
  .inputValidator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    await deleteTestimonialById(data.id);
    return { success: true };
  });

export const saveShopItem = createServerFn({ method: "POST" })
  .inputValidator((data: SaveShopItemInput) => data)
  .handler(async ({ data }) => {
    await upsertShopItem(data);
    return { success: true };
  });

export const deleteShopItem = createServerFn({ method: "POST" })
  .inputValidator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    await deleteShopItemById(data.id);
    return { success: true };
  });

export const saveBlogPost = createServerFn({ method: "POST" })
  .inputValidator((data: SaveBlogPostInput) => data)
  .handler(async ({ data }) => {
    await upsertBlogPost(data);
    return { success: true };
  });

export const deleteBlogPost = createServerFn({ method: "POST" })
  .inputValidator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    await deleteBlogPostById(data.id);
    return { success: true };
  });
