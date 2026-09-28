import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});


export const enquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  serviceId: z.string().uuid().optional().nullable(),
  profileId: z.string().uuid().optional().nullable(),
});

export const profileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  slug: z.string().min(2, "Slug is required"),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(1, "Location is required"),
  gender: z.string().min(1, "Gender is required"),
  age: z.coerce.number().int().min(1).max(120),
  height: z.string().optional().nullable(),
  skills: z.array(z.string()).default([]),
  languages: z.array(z.string()).default([]),
  experienceYears: z.coerce.number().int().min(0).default(1),
  shortBio: z.string().min(5, "Short bio is required"),
  fullBio: z.string().min(10, "Full bio is required"),
  profileImage: z.string().min(1, "Profile image URL is required"),
  portfolioImages: z.array(z.string()).default([]),
  videos: z.array(z.object({
    title: z.string(),
    url: z.string(),
    thumbnail: z.string().optional()
  })).default([]),
  previousProjects: z.array(z.object({
    title: z.string(),
    role: z.string(),
    year: z.string(),
    client: z.string().optional()
  })).default([]),
  socialLinks: z.record(z.string()).default({}),
  isFeatured: z.boolean().default(false),
  status: z.enum(["draft", "published", "unpublished"]).default("published"),
});

export const serviceSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  shortDescription: z.string().min(5, "Short description is required"),
  detailedContent: z.string().min(10, "Detailed content is required"),
  image: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  displayOrder: z.coerce.number().int().default(0),
  status: z.enum(["draft", "published", "unpublished"]).default("published"),
});

export const projectSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(5, "Description is required"),
  clientName: z.string().min(1, "Client name is required"),
  completionDate: z.string().min(1, "Completion date is required"),
  coverImage: z.string().min(1, "Cover image is required"),
  images: z.array(z.string()).default([]),
  videos: z.array(z.object({
    title: z.string(),
    url: z.string()
  })).default([]),
  caseStudy: z.string().optional().nullable(),
  isFeatured: z.boolean().default(false),
  status: z.enum(["draft", "published", "unpublished"]).default("published"),
});

export const gallerySchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().optional().nullable(),
  mediaType: z.enum(["image", "video"]),
  mediaUrl: z.string().min(1, "Media URL is required"),
  thumbnailUrl: z.string().optional().nullable(),
  tags: z.array(z.string()).default([]),
  displayOrder: z.coerce.number().int().default(0),
  status: z.enum(["draft", "published", "unpublished"]).default("published"),
});

export const testimonialSchema = z.object({
  personName: z.string().min(2, "Person name is required"),
  profileImage: z.string().optional().nullable(),
  designation: z.string().min(1, "Designation is required"),
  company: z.string().min(1, "Company is required"),
  testimonial: z.string().min(5, "Testimonial is required"),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  displayOrder: z.coerce.number().int().default(0),
  status: z.enum(["draft", "published", "unpublished"]).default("published"),
});

export const clientSchema = z.object({
  name: z.string().min(2, "Name is required"),
  logoUrl: z.string().min(1, "Logo URL is required"),
  description: z.string().optional().nullable(),
  associatedProjects: z.array(z.string()).default([]),
  caseStudyUrl: z.string().optional().nullable(),
  displayOrder: z.coerce.number().int().default(0),
  status: z.enum(["draft", "published", "unpublished"]).default("published"),
});

export const auditionSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().optional().nullable(),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(1, "Location is required"),
  productionHouse: z.string().min(1, "Production house is required"),
  projectType: z.string().min(1, "Project type is required"),
  compensation: z.string().min(1, "Compensation is required"),
  deadline: z.string().min(1, "Deadline is required"),
  rolesAvailable: z.string().min(1, "Roles available is required"),
  shortDescription: z.string().min(5, "Short description is required"),
  fullDescription: z.string().min(10, "Full description is required"),
  requirements: z.array(z.string()).default([]),
  isUrgent: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  postedDate: z.string().default("Recently"),
  spotsOpen: z.coerce.number().int().min(1).default(1),
  status: z.enum(["draft", "published", "closed"]).default("published"),
});

