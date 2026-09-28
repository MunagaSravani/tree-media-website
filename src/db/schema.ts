import { pgTable, text, timestamp, boolean, integer, uuid, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// 1. Admins
export const admins = pgTable("admins", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 1b. Users (Talents, Clients & Creators)
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  username: text("username").unique(),
  phone: text("phone").unique(),
  email: text("email").unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").default("talent").notNull(), // 'talent' | 'client' | 'creator'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 2. Homepage Settings
export const homepageSettings = pgTable("homepage_settings", {
  id: uuid("id").defaultRandom().primaryKey(),
  heroTitle: text("hero_title").notNull(),
  heroSubtitle: text("hero_subtitle"),
  heroDescription: text("hero_description").notNull(),
  heroImage: text("hero_image"),
  heroVideo: text("hero_video"),
  heroPrimaryBtnText: text("hero_primary_btn_text").default("Discover Talents").notNull(),
  heroPrimaryBtnLink: text("hero_primary_btn_link").default("/profiles").notNull(),
  heroSecondaryBtnText: text("hero_secondary_btn_text").default("Explore Services").notNull(),
  heroSecondaryBtnLink: text("hero_secondary_btn_link").default("/services").notNull(),
  aboutHeading: text("about_heading").notNull(),
  aboutDescription: text("about_description").notNull(),
  aboutImage: text("about_image"),
  aboutVideo: text("about_video"),
  aboutLink: text("about_link").default("/about"),
  ctaHeading: text("cta_heading").notNull(),
  ctaDescription: text("cta_description").notNull(),
  ctaBtnText: text("cta_btn_text").default("Book a Consultation").notNull(),
  ctaBtnLink: text("cta_btn_link").default("/contact").notNull(),
  ctaImage: text("cta_image"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 3. Agency Statistics
export const agencyStatistics = pgTable("agency_statistics", {
  id: uuid("id").defaultRandom().primaryKey(),
  label: text("label").notNull(),
  value: text("value").notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});

// 4. About Page Content
export const aboutPageContent = pgTable("about_page_content", {
  id: uuid("id").defaultRandom().primaryKey(),
  introTitle: text("intro_title").notNull(),
  introText: text("intro_text").notNull(),
  storyTitle: text("story_title").notNull(),
  storyText: text("story_text").notNull(),
  mission: text("mission").notNull(),
  vision: text("vision").notNull(),
  values: jsonb("values").default([]), // array of { title, description, icon }
  experienceYears: integer("experience_years").default(3).notNull(),
  experienceSummary: text("experience_summary").notNull(),
  achievements: jsonb("achievements").default([]), // array of { year, title, description }
  images: jsonb("images").default([]),
  videos: jsonb("videos").default([]),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 5. Services Catalog
export const services = pgTable("services", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  shortDescription: text("short_description").notNull(),
  detailedContent: text("detailed_content").notNull(),
  image: text("image"),
  icon: text("icon"),
  displayOrder: integer("display_order").default(0).notNull(),
  status: text("status").default("published").notNull(), // 'draft' | 'published' | 'unpublished'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 6. Profiles (Talents & Artists)
export const profiles = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(), // Actor, Model, Voice Artist, Director, Musician, etc.
  location: text("location").notNull(),
  gender: text("gender").notNull(),
  age: integer("age").notNull(),
  height: text("height"),
  skills: jsonb("skills").default([]), // string[]
  languages: jsonb("languages").default([]), // string[]
  experienceYears: integer("experience_years").default(1).notNull(),
  shortBio: text("short_bio").notNull(),
  fullBio: text("full_bio").notNull(),
  profileImage: text("profile_image").notNull(),
  portfolioImages: jsonb("portfolio_images").default([]), // string[]
  videos: jsonb("videos").default([]), // { title, url, thumbnail }[]
  previousProjects: jsonb("previous_projects").default([]), // { title, role, year, client }[]
  socialLinks: jsonb("social_links").default({}), // { instagram, youtube, imdb, twitter, linkedin }
  isFeatured: boolean("is_featured").default(false).notNull(),
  status: text("status").default("published").notNull(), // 'draft' | 'published' | 'unpublished'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 7. Projects (Portfolio Showcase)
export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  clientName: text("client_name").notNull(),
  completionDate: text("completion_date").notNull(),
  coverImage: text("cover_image").notNull(),
  images: jsonb("images").default([]), // string[]
  videos: jsonb("videos").default([]), // { title, url }[]
  caseStudy: text("case_study"),
  isFeatured: boolean("is_featured").default(false).notNull(),
  status: text("status").default("published").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 8. Gallery Media (Images & Videos)
export const galleryMedia = pgTable("gallery_media", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  mediaType: text("media_type").notNull(), // 'image' | 'video'
  mediaUrl: text("media_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  tags: jsonb("tags").default([]), // string[]
  displayOrder: integer("display_order").default(0).notNull(),
  status: text("status").default("published").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 9. Testimonials
export const testimonials = pgTable("testimonials", {
  id: uuid("id").defaultRandom().primaryKey(),
  personName: text("person_name").notNull(),
  profileImage: text("profile_image"),
  designation: text("designation").notNull(),
  company: text("company").notNull(),
  testimonial: text("testimonial").notNull(),
  rating: integer("rating").default(5).notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
  status: text("status").default("published").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 10. Clients & Brand Partners
export const clients = pgTable("clients", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  logoUrl: text("logo_url").notNull(),
  description: text("description"),
  associatedProjects: jsonb("associated_projects").default([]),
  caseStudyUrl: text("case_study_url"),
  displayOrder: integer("display_order").default(0).notNull(),
  status: text("status").default("published").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 11. Contact Information
export const contactInformation = pgTable("contact_information", {
  id: uuid("id").defaultRandom().primaryKey(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  officeAddress: text("office_address").notNull(),
  googleMapsUrl: text("google_maps_url"),
  googleMapsEmbed: text("google_maps_embed"),
  socialLinks: jsonb("social_links").default({}),
  workingHours: text("working_hours").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 12. Enquiries & Bookings
export const enquiries = pgTable("enquiries", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  serviceId: uuid("service_id").references(() => services.id, { onDelete: "set null" }),
  profileId: uuid("profile_id").references(() => profiles.id, { onDelete: "set null" }),
  status: text("status").default("new").notNull(), // 'new' | 'in_progress' | 'completed' | 'closed'
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 13. Auditions (Casting Calls & Opportunities)
export const auditions = pgTable("auditions", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug"),
  category: text("category").notNull(), // Actor, Model, Singer, Dancer, Anchor, Voice Artist, Influencer, Photographer, Content Creator
  location: text("location").notNull(), // Mumbai, Hyderabad, Bengaluru, Chennai, Delhi NCR, Kolkata, Pune
  productionHouse: text("production_house").notNull(),
  projectType: text("project_type").notNull(),
  compensation: text("compensation").notNull(),
  deadline: text("deadline").notNull(),
  rolesAvailable: text("roles_available").notNull(),
  shortDescription: text("short_description").notNull(),
  fullDescription: text("full_description").notNull(),
  requirements: jsonb("requirements").default([]), // string[]
  isUrgent: boolean("is_urgent").default(false).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  postedDate: text("posted_date").default("Recently").notNull(),
  spotsOpen: integer("spots_open").default(1).notNull(),
  status: text("status").default("published").notNull(), // 'draft' | 'published' | 'closed'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Relations
export const enquiriesRelations = relations(enquiries, ({ one }) => ({
  service: one(services, {
    fields: [enquiries.serviceId],
    references: [services.id],
  }),
  profile: one(profiles, {
    fields: [enquiries.profileId],
    references: [profiles.id],
  }),
}));

