# InCity Research Platform - CMS User Guide

A guide for managing content in the InCity Research Platform using Sanity Studio.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Adding a New Person](#adding-a-new-person)
3. [Adding a Publication](#adding-a-publication)
4. [Adding a Project](#adding-a-project)
5. [Updating Charts](#updating-charts)
6. [Working with Images](#working-with-images)
7. [Tips & Best Practices](#tips--best-practices)

---

## Getting Started

### Accessing the CMS

1. Open your web browser and go to: `https://your-site.com/studio`
2. Log in with your Sanity account credentials
3. You'll see the main dashboard with three content types:
   - **Person** - Team members and researchers
   - **Publication** - Research papers and documents
   - **Project** - Research projects

### Navigation

- **Left Sidebar**: Lists all content types (Person, Publication, Project)
- **Main Area**: Shows documents of the selected type
- **Editor Panel**: Opens when you click on a document to edit

---

## Adding a New Person

Team members, faculty, students, and alumni are managed through the **Person** content type.

### Step-by-Step

1. Click **Person** in the left sidebar
2. Click the **+ Create** button (top right)
3. Fill in the required fields:

| Field | Required | Description |
|-------|----------|-------------|
| **Name** | Yes | Full name (e.g., "Dr. Jane Smith") |
| **Slug** | Yes | Click "Generate" to auto-create from name |
| **Role** | Yes | Select from dropdown (see below) |
| **Photo** | No | Profile picture (see [Working with Images](#working-with-images)) |
| **Biography** | No | Rich text description |
| **Email** | No | Contact email address |
| **LinkedIn URL** | No | Full LinkedIn profile URL |

### Understanding the Role Dropdown

The **Role** field determines how this person appears on the website:

| Role | Use For |
|------|---------|
| **Director** | Lab/center directors and leadership |
| **Faculty** | Professors and researchers |
| **Staff** | Administrative and support staff |
| **Student** | Current graduate/undergraduate students |
| **Alumni** | Former students and staff |

> **Important**: Choose the role carefully! People are grouped and displayed by their role on the "People" page.

### Example: Adding a New Faculty Member

```
Name: Dr. Maria Garcia
Slug: dr-maria-garcia (click "Generate")
Role: Faculty (select radio button)
Email: m.garcia@university.edu
Bio: Dr. Garcia specializes in urban transportation...
```

4. Click **Publish** (bottom right) to make the person visible on the website

---

## Adding a Publication

Research papers, articles, and reports are managed through the **Publication** content type.

### Step-by-Step

1. Click **Publication** in the left sidebar
2. Click the **+ Create** button
3. Fill in the required fields:

| Field | Required | Description |
|-------|----------|-------------|
| **Title** | Yes | Full publication title |
| **Slug** | Yes | Click "Generate" to auto-create |
| **Authors** | Yes | Link to Person records (see below) |
| **Publication Date** | Yes | Date published (YYYY-MM-DD format) |
| **Document Type** | Yes | Select from dropdown |
| **Abstract** | No | Summary of the publication |
| **PDF File** | No | Upload the publication PDF |
| **External URL** | No | DOI link or external page |
| **Tags** | No | Keywords for filtering |

### Linking Authors (Important!)

The **Authors** field connects publications to Person records in the system.

**To add an author:**

1. Click **Add item** in the Authors section
2. Start typing the person's name
3. Select the matching person from the dropdown
4. Repeat for additional authors

> **Note**: Authors must already exist as Person records! If the author doesn't appear in the search, you need to [add them as a Person](#adding-a-new-person) first.

**Author order matters** - the first author listed will appear first in citations.

### Document Types

| Type | Use For |
|------|---------|
| **Journal Article** | Peer-reviewed journal publications |
| **Conference Paper** | Papers presented at conferences |
| **Thesis** | Master's or PhD dissertations |
| **Report** | Technical reports and white papers |
| **Book Chapter** | Chapters in edited books |

### Adding Tags

Tags help users filter and find publications:

1. Click in the **Tags** field
2. Type a keyword and press Enter
3. Repeat for additional tags

Example tags: `urban planning`, `transportation`, `climate`, `GIS`

4. Click **Publish** to save

---

## Adding a Project

Research projects are managed through the **Project** content type.

### Step-by-Step

1. Click **Project** in the left sidebar
2. Click the **+ Create** button
3. Fill in the fields:

| Field | Required | Description |
|-------|----------|-------------|
| **Headline** | Yes | Project title |
| **Slug** | Yes | Click "Generate" to auto-create |
| **Description** | No | Rich text project description |
| **Research Theme** | Yes | Primary research area |
| **Status** | Yes | Current project status |
| **Team Members** | No | Link to Person records |
| **Featured Image** | No | Main project image |
| **Chart Data** | No | Data visualization (see below) |
| **Related Publications** | No | Link to Publication records |
| **Start Date** | No | Project start date |
| **End Date** | No | Project end date (if completed) |

### Research Themes

| Theme | Description |
|-------|-------------|
| **Urban Systems** | Infrastructure, transportation, utilities |
| **Human Behavior** | Social patterns, demographics, community |
| **Policy & Planning** | Governance, regulations, urban planning |

### Project Status

| Status | Use When |
|--------|----------|
| **Active** | Project is currently ongoing |
| **Completed** | Project has finished |
| **Planned** | Project is scheduled but not started |

---

## Updating Charts

Projects can include data visualizations. Here's how to add or update chart data.

### Understanding Chart Data Structure

Charts consist of:
- **Chart Type**: The visualization style
- **Title**: Display title above the chart
- **Data Points**: The actual numbers to visualize
- **Axis Labels**: Labels for X and Y axes

### Step-by-Step: Adding a Chart

1. Open a Project for editing
2. Scroll down to **Chart Data** section
3. Click to expand the section

#### 1. Select Chart Type

| Chart Type | Best For |
|------------|----------|
| **Bar Chart** | Comparing categories |
| **Line Chart** | Showing trends over time |
| **Pie Chart** | Showing proportions (parts of a whole) |
| **Area Chart** | Cumulative values over time |

#### 2. Enter Chart Title

A descriptive title that appears above the chart.

Example: `Annual Research Funding by Year`

#### 3. Add Data Points

Each data point needs a **Label** and a **Value**:

1. Click **Add item** in Data Points
2. Enter:
   - **Label**: The category name (appears on X-axis)
   - **Value**: The numeric value (appears on Y-axis)
3. Repeat for each data point

**Example - Bar Chart Data:**

| Label | Value |
|-------|-------|
| 2020 | 150000 |
| 2021 | 185000 |
| 2022 | 220000 |
| 2023 | 275000 |

**Example - Pie Chart Data:**

| Label | Value |
|-------|-------|
| Federal Grants | 45 |
| State Funding | 30 |
| Private Donations | 15 |
| University Support | 10 |

#### 4. Add Axis Labels (Optional)

- **X-Axis Label**: Label for horizontal axis (e.g., "Year")
- **Y-Axis Label**: Label for vertical axis (e.g., "Funding ($)")

> **Note for Pie Charts**: Axis labels are ignored for pie charts since they don't have axes.

### Complete Chart Example

```
Chart Type: Bar Chart
Title: Student Enrollment by Program
X-Axis Label: Program
Y-Axis Label: Number of Students

Data Points:
1. Label: "Urban Planning"    Value: 45
2. Label: "Transportation"    Value: 32
3. Label: "Environmental"     Value: 28
4. Label: "Policy Studies"    Value: 19
```

### Updating Existing Chart Data

1. Open the Project
2. Expand the Chart Data section
3. Modify any field directly
4. To remove a data point, hover over it and click the trash icon
5. To reorder data points, drag them by the handle on the left
6. Click **Publish** to save changes

---

## Working with Images

### Uploading Images

1. Click the image field (Photo, Featured Image, etc.)
2. Click **Upload** and select a file, or drag and drop
3. Supported formats: JPG, PNG, GIF, WebP
4. Recommended size: At least 800x600 pixels

### Using Hotspot & Crop

After uploading, you can set a "hotspot" - the focal point that should always be visible:

1. Click **Edit** on the uploaded image
2. Drag the circle to the main subject
3. Adjust the crop rectangle if needed
4. Click **Done**

### Alternative Text (Accessibility)

Always add alt text to describe images:

1. After uploading, fill in the **Alternative Text** field
2. Describe what's in the image
3. Example: "Dr. Smith presenting at the Urban Studies Conference"

---

## Tips & Best Practices

### Before Publishing

- [ ] All required fields are filled (marked with red asterisks)
- [ ] Slug is generated (click "Generate" if empty)
- [ ] Images have alternative text
- [ ] Authors/Team members are properly linked
- [ ] Dates are in correct format

### Common Issues

**"Document has validation errors"**
- Look for red-highlighted fields
- Required fields may be empty or have invalid data

**"Person/Publication not found when searching"**
- The record might not be published yet
- Check if the name is spelled correctly
- Try searching with fewer characters

**Changes not appearing on website**
- Make sure you clicked **Publish** (not just saved as draft)
- Website may take 1-2 minutes to update
- Try refreshing your browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### Drafts vs. Published

- **Draft**: Saved but not visible on the website
- **Published**: Visible to all website visitors

You can see the document status in the bottom toolbar. A yellow "Unpublished changes" badge means you have edits that aren't live yet.

### Getting Help

If you encounter issues:
1. Check the validation messages (red text near fields)
2. Ensure all referenced items (authors, publications) are published
3. Contact your system administrator for technical issues

---

## Quick Reference Card

### Content Types

| Type | Purpose | Required Fields |
|------|---------|-----------------|
| Person | Team members | Name, Slug, Role |
| Publication | Research papers | Title, Slug, Authors, Date, Type |
| Project | Research projects | Headline, Slug, Theme, Status |

### Keyboard Shortcuts

| Action | Mac | Windows |
|--------|-----|---------|
| Save draft | Cmd+S | Ctrl+S |
| Publish | Cmd+Shift+P | Ctrl+Shift+P |
| Search | Cmd+K | Ctrl+K |

---

*Last updated: January 2026*
