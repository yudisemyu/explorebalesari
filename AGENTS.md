# AGENTS.md

# Website Promosi Desa Balesari

## Project Overview

Develop a modern promotional website for **Desa Balesari**.

This is **NOT** a government administration system.

The primary goal is to introduce the village to visitors through a visually appealing, interactive, responsive, and SEO-friendly website while allowing village administrators to manage content through an internal dashboard.

The website should feel closer to a tourism website than a government portal.

---

# Tech Stack

## Frontend

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Lucide Icons

## Backend

- Next.js Route Handlers
- Server Actions when appropriate

## Database

- Supabase PostgreSQL

## Authentication

- Supabase Auth
- Email & Password
- Admin only

## Storage

- Supabase Storage

Buckets:

- profile
- wisata
- umkm
- berita
- gallery

Delete unused images whenever content is updated or deleted.

Never leave orphan files in storage.

## Rich Text Editor

Tiptap

Used only for:

- News
- Village Profile
- Tourism Description

Store editor content as HTML.

---

# Design Philosophy

The website should look like a premium tourism landing page.

Avoid traditional government website layouts.

Keywords:

- Modern
- Elegant
- Interactive
- Clean
- Minimal
- Premium
- Friendly
- Nature-inspired

Visual inspiration:

Apple
Airbnb
Linear
Vercel
Travel destination websites

---

# Color Palette

Primary

Forest Green

Secondary

Cream

Accent

Earth Brown

Support

White
Light Gray

Avoid saturated colors.

---

# UI Principles

Large hero section.

Beautiful full-width photography.

Rounded cards.

Soft shadows.

Large spacing.

Smooth animations.

Glass effect only where appropriate.

Never overuse glassmorphism.

Animations should be subtle.

Prioritize readability.

---

# Typography

Modern sans-serif.

Recommended:

- Geist
or
- Inter

Large headings.

Comfortable reading width.

---

# Pages

## Public

/

Landing Page

Sections:

- Hero
- About Village
- Village Statistics
- Village Potentials
- Tourism
- UMKM
- News
- Gallery
- Map
- Contact

---

/profil

Village profile.

---

/wisata

Tourism destinations.

---

/wisata/[slug]

Tourism detail.

---

/umkm

UMKM directory.

---

/umkm/[slug]

UMKM detail.

---

/berita

News list.

---

/berita/[slug]

News article.

---

/galeri

Photo gallery.

---

# Admin

/admin/login

/admin/dashboard

/admin/profil

/admin/wisata

/admin/umkm

/admin/berita

/admin/gallery

---

# Dashboard Features

CRUD:

Village Profile

Tourism

UMKM

News

Gallery

Statistics

Contact Information

Homepage Hero

---

# Components

Navbar

Footer

Hero

Section Title

Image Card

News Card

Tourism Card

UMKM Card

Gallery Grid

Statistics Card

Map Section

CTA Banner

Animated Counter

Floating Scroll Button

---

# Motion

Use Framer Motion.

Animations:

Fade

Slide Up

Scale

Hover

Reveal on Scroll

Do NOT over animate.

Keep animations smooth.

---

# Image Strategy

Use next/image.

Images uploaded to Supabase Storage.

Convert images to WebP whenever possible.

Limit upload size.

Recommended:

Max width:

1920px

Maximum upload:

2 MB

---

# SEO

Every page must include:

Title

Description

Open Graph

Twitter Card

Canonical URL

Structured Metadata when applicable.

---

# Performance

Target Lighthouse

Performance > 90

Accessibility > 90

Best Practices > 90

SEO > 95

---

# Accessibility

Keyboard navigation.

Proper heading hierarchy.

Alt text for images.

Sufficient color contrast.

---

# Admin Experience

Simple.

Minimal.

Non-technical users should understand it.

Use:

Table

Search

Filter

Pagination

Confirmation Dialog

Toast Notification

Loading Skeleton

Empty State

---

# Security

Protect admin routes.

Validate all forms.

Use Zod.

Never trust client input.

Sanitize rich text.

---

# Database

Use relational design.

Example:

admins

news

tourism

umkm

gallery

homepage

statistics

contacts

---

# Storage Rules

On Create:

Upload image

Store URL

Save database record

On Update:

Upload new image

Update database

Delete old image

On Delete:

Delete image from storage

Delete database record

Storage must never contain unused files.

---

# Coding Style

Prefer Server Components.

Use Client Components only when necessary.

Avoid unnecessary state.

Keep components small.

Prefer composition over large files.

---

# Folder Structure

/app

/components

/features

/lib

/hooks

/types

/utils

/actions

/services

---

# Forms

React Hook Form

+

Zod

---

# Rich Text

Use Tiptap.

Toolbar:

Heading

Bold

Italic

Bullet List

Number List

Quote

Link

Image

Undo

Redo

Store HTML.

---

# Future Expansion

The architecture should allow adding:

Village Events

Downloads

Village Officials

Public Services

Village Regulations

Potential Investment

Without major refactoring.

---

# Overall Goal

Build a website that makes visitors think:

"This village looks professional, beautiful, and worth visiting."

The experience should feel modern, lightweight, trustworthy, and enjoyable while remaining easy for village administrators to maintain.