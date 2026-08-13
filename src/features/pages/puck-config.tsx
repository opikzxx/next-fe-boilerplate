import type { ComponentConfig, Slot, UserGenerics } from "@measured/puck";
import {
  AccordionBlock,
  ContainerBlock,
  CTABannerBlock,
  FlexBlock,
  GalleryBlock,
  GridBlock,
  HeadingBlock,
  HeroBlock,
  ImageBlock,
  ImageWithTextBlock,
  ParagraphBlock,
  RichTextBlock,
  SectionHeadingBlock,
  ServiceCardsBlock,
  SolutionsCarouselBlock,
  SpacerBlock,
  StatsBannerBlock,
} from "@/features/pages/blocks";
import type {
  AccordionBlockProps,
  ContainerBlockProps,
  CTABannerBlockProps,
  FlexBlockProps,
  GalleryBlockProps,
  GridBlockProps,
  HeadingBlockProps,
  HeroBlockProps,
  ImageBlockProps,
  ImageWithTextBlockProps,
  ParagraphBlockProps,
  RichTextBlockProps,
  SectionHeadingBlockProps,
  ServiceCardsBlockProps,
  SolutionsCarouselBlockProps,
  SpacerBlockProps,
  StatsBannerBlockProps,
} from "@/features/pages/blocks";
import { ColorField } from "@/features/pages/color-field";
import { BACKGROUND_COLOR_TOKENS, TEXT_COLOR_TOKENS } from "@/features/pages/color-tokens";
import { ImageUploadField } from "@/features/pages/image-upload-field";

const COLOR_FIELD = {
  type: "custom" as const,
  label: "Background color",
  render: ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
    <ColorField
      value={value}
      onChange={onChange}
      tokens={BACKGROUND_COLOR_TOKENS}
      fallback="none"
    />
  ),
};

const ALIGN_FIELD = {
  type: "radio" as const,
  label: "Text align",
  options: [
    { label: "Left", value: "left" },
    { label: "Center", value: "center" },
    { label: "Right", value: "right" },
  ],
};

const WIDTH_FIELD = {
  type: "select" as const,
  label: "Width",
  options: [
    { label: "Small", value: "sm" },
    { label: "Medium", value: "md" },
    { label: "Large", value: "lg" },
    { label: "Extra large", value: "xl" },
    { label: "Full width (edge-to-edge)", value: "full" },
  ],
};

const TEXT_COLOR_FIELD = {
  type: "custom" as const,
  label: "Text color",
  render: ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
    <ColorField
      value={value}
      onChange={onChange}
      tokens={TEXT_COLOR_TOKENS}
      fallback="default"
    />
  ),
};

const hero: ComponentConfig<HeroBlockProps> = {
  label: "Hero",
  fields: {
    heading: { type: "text", label: "Heading" },
    subtitle: { type: "textarea", label: "Subtitle" },
    ctaLabel: { type: "text", label: "Button label" },
    ctaHref: { type: "text", label: "Button link" },
    ctaIcon: {
      type: "radio",
      label: "Button icon",
      options: [
        { label: "Show", value: true },
        { label: "Hide", value: false },
      ],
    },
    image: {
      type: "custom",
      label: "Background image",
      render: ({ value, onChange }) => (
        <ImageUploadField value={value} onChange={onChange} />
      ),
    },
    imageAlt: { type: "text", label: "Background image alt text" },
    color: COLOR_FIELD,
    overlay: {
      type: "select",
      label: "Image overlay",
      options: [
        { label: "None", value: "none" },
        { label: "Gradient (fades left to right)", value: "gradient" },
        { label: "Solid tint", value: "solid" },
      ],
    },
    textColor: TEXT_COLOR_FIELD,
    showStats: {
      type: "radio",
      label: "Stats bar",
      options: [
        { label: "Show", value: true },
        { label: "Hide", value: false },
      ],
    },
    stats: {
      type: "array",
      label: "Stats",
      arrayFields: {
        value: { type: "text", label: "Value" },
        label: { type: "text", label: "Label" },
      },
      defaultItemProps: { value: "", label: "" },
      getItemSummary: (item) => item.label || item.value || "Stat",
    },
  },
  defaultProps: {
    heading: "",
    subtitle: "",
    ctaLabel: "",
    ctaHref: "",
    ctaIcon: true,
    image: "",
    imageAlt: "",
    color: "dnet-blue",
    overlay: "gradient",
    textColor: "white",
    showStats: true,
    stats: [],
  },
  render: (props) => <HeroBlock {...props} />,
};

const richText: ComponentConfig<RichTextBlockProps> = {
  label: "Rich text",
  fields: {
    heading: { type: "text", label: "Heading" },
    body: { type: "textarea", label: "Body" },
    color: COLOR_FIELD,
    width: WIDTH_FIELD,
    align: ALIGN_FIELD,
  },
  defaultProps: {
    heading: "",
    body: "",
    color: "none",
    width: "md",
    align: "left",
  },
  render: (props) => <RichTextBlock {...props} />,
};

const imageWithText: ComponentConfig<ImageWithTextBlockProps> = {
  label: "Image with text",
  fields: {
    heading: { type: "text", label: "Heading" },
    body: { type: "textarea", label: "Body" },
    image: {
      type: "custom",
      label: "Image",
      render: ({ value, onChange }) => (
        <ImageUploadField value={value} onChange={onChange} />
      ),
    },
    imagePosition: {
      type: "radio",
      label: "Image position",
      options: [
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
      ],
    },
  },
  defaultProps: {
    heading: "",
    body: "",
    image: "",
    imagePosition: "left",
  },
  render: (props) => <ImageWithTextBlock {...props} />,
};

const ctaBanner: ComponentConfig<CTABannerBlockProps> = {
  label: "CTA banner",
  fields: {
    heading: { type: "text", label: "Heading" },
    body: { type: "textarea", label: "Body" },
    ctaLabel: { type: "text", label: "Button label" },
    ctaHref: { type: "text", label: "Button link" },
    color: COLOR_FIELD,
  },
  defaultProps: {
    heading: "",
    body: "",
    ctaLabel: "",
    ctaHref: "",
    color: "primary",
  },
  render: (props) => <CTABannerBlock {...props} />,
};

const gallery: ComponentConfig<GalleryBlockProps> = {
  label: "Gallery",
  fields: {
    images: {
      type: "array",
      label: "Images",
      arrayFields: {
        image: {
          type: "custom",
          label: "Image",
          render: ({ value, onChange }) => (
            <ImageUploadField value={value} onChange={onChange} />
          ),
        },
        alt: { type: "text", label: "Alt text" },
      },
      defaultItemProps: { image: "", alt: "" },
      getItemSummary: (item) => item.alt || "Image",
    },
  },
  defaultProps: { images: [] },
  render: (props) => <GalleryBlock {...props} />,
};

const accordion: ComponentConfig<AccordionBlockProps> = {
  label: "Accordion (FAQ)",
  fields: {
    items: {
      type: "array",
      label: "Items",
      arrayFields: {
        question: { type: "text", label: "Question" },
        answer: { type: "textarea", label: "Answer" },
      },
      defaultItemProps: { question: "", answer: "" },
      getItemSummary: (item) => item.question || "Question",
    },
  },
  defaultProps: { items: [] },
  render: (props) => <AccordionBlock {...props} />,
};

const spacer: ComponentConfig<SpacerBlockProps> = {
  label: "Space",
  fields: {
    size: {
      type: "select",
      label: "Size",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
  },
  defaultProps: { size: "md" },
  render: (props) => <SpacerBlock {...props} />,
};

const heading: ComponentConfig<HeadingBlockProps> = {
  label: "Heading",
  fields: {
    text: { type: "text", label: "Text" },
    level: {
      type: "radio",
      label: "Level (document outline)",
      options: [
        { label: "H2", value: "h2" },
        { label: "H3", value: "h3" },
      ],
    },
    size: {
      type: "select",
      label: "Size",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Extra large", value: "xl" },
      ],
    },
    color: TEXT_COLOR_FIELD,
    width: WIDTH_FIELD,
    align: ALIGN_FIELD,
  },
  defaultProps: {
    text: "",
    level: "h2",
    size: "lg",
    color: "default",
    width: "md",
    align: "left",
  },
  render: (props) => <HeadingBlock {...props} />,
};

const paragraph: ComponentConfig<ParagraphBlockProps> = {
  label: "Paragraph",
  fields: {
    text: { type: "textarea", label: "Text" },
    size: {
      type: "select",
      label: "Size",
      options: [
        { label: "Small", value: "sm" },
        { label: "Base", value: "base" },
        { label: "Large", value: "lg" },
      ],
    },
    color: TEXT_COLOR_FIELD,
    width: WIDTH_FIELD,
    align: ALIGN_FIELD,
  },
  defaultProps: {
    text: "",
    size: "base",
    color: "default",
    width: "md",
    align: "left",
  },
  render: (props) => <ParagraphBlock {...props} />,
};

const sectionHeading: ComponentConfig<SectionHeadingBlockProps> = {
  label: "Section heading",
  fields: {
    badge: { type: "text", label: "Badge" },
    heading: { type: "text", label: "Heading" },
    headingAccent: { type: "text", label: "Heading (accent color)" },
    subtitle: { type: "textarea", label: "Subtitle" },
    badgeColor: COLOR_FIELD,
    accentColor: TEXT_COLOR_FIELD,
    align: ALIGN_FIELD,
  },
  defaultProps: {
    badge: "",
    heading: "",
    headingAccent: "",
    subtitle: "",
    badgeColor: "accent",
    accentColor: "dnet-blue",
    align: "center",
  },
  render: (props) => <SectionHeadingBlock {...props} />,
};

const serviceCards: ComponentConfig<ServiceCardsBlockProps> = {
  label: "Service cards",
  fields: {
    columns: {
      type: "radio",
      label: "Columns",
      options: [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
      ],
    },
    cards: {
      type: "array",
      label: "Cards",
      arrayFields: {
        image: {
          type: "custom",
          label: "Background image",
          render: ({ value, onChange }) => (
            <ImageUploadField value={value} onChange={onChange} />
          ),
        },
        imageAlt: { type: "text", label: "Background image alt text" },
        icon: {
          type: "select",
          label: "Icon",
          options: [
            { label: "Wifi", value: "wifi" },
            { label: "Cloud", value: "cloud" },
            { label: "Briefcase", value: "briefcase" },
            { label: "Settings", value: "settings" },
            { label: "Shield", value: "shield" },
            { label: "Server", value: "server" },
            { label: "Globe", value: "globe" },
            { label: "Zap", value: "zap" },
            { label: "Headphones", value: "headphones" },
          ],
        },
        iconColor: TEXT_COLOR_FIELD,
        title: { type: "text", label: "Title" },
        description: {
          type: "textarea",
          label: "Description (screen readers only)",
        },
        ctaLabel: { type: "text", label: "Button label" },
        ctaHref: { type: "text", label: "Button link" },
      },
      defaultItemProps: {
        image: "",
        imageAlt: "",
        icon: "wifi",
        iconColor: "dnet-orange",
        title: "",
        description: "",
        ctaLabel: "Discover more",
        ctaHref: "",
      },
      getItemSummary: (item) => item.title || "Card",
    },
    seeMoreLabel: { type: "text", label: "\"See more\" button label" },
    seeMoreHref: { type: "text", label: "\"See more\" button link" },
  },
  defaultProps: { columns: 2, cards: [], seeMoreLabel: "", seeMoreHref: "" },
  render: (props) => <ServiceCardsBlock {...props} />,
};

const solutionsCarousel: ComponentConfig<SolutionsCarouselBlockProps> = {
  label: "Solutions carousel",
  fields: {
    ctaLabel: { type: "text", label: "Card link label" },
    prevLabel: { type: "text", label: "Previous button label" },
    nextLabel: { type: "text", label: "Next button label" },
    items: {
      type: "array",
      label: "Items",
      arrayFields: {
        image: {
          type: "custom",
          label: "Image",
          render: ({ value, onChange }) => (
            <ImageUploadField value={value} onChange={onChange} />
          ),
        },
        imageAlt: { type: "text", label: "Image alt text" },
        title: { type: "text", label: "Title" },
        href: { type: "text", label: "Link" },
      },
      defaultItemProps: { image: "", imageAlt: "", title: "", href: "" },
      getItemSummary: (item) => item.title || "Item",
    },
  },
  defaultProps: {
    ctaLabel: "Explore",
    prevLabel: "Previous",
    nextLabel: "Next",
    items: [],
  },
  render: (props) => <SolutionsCarouselBlock {...props} />,
};

const statsBanner: ComponentConfig<StatsBannerBlockProps> = {
  label: "Stats banner",
  fields: {
    backgroundColor: COLOR_FIELD,
    backgroundImage: {
      type: "custom",
      label: "Background image",
      render: ({ value, onChange }) => (
        <ImageUploadField value={value} onChange={onChange} />
      ),
    },
    backgroundImageAlt: { type: "text", label: "Background image alt text" },
    gradient: {
      type: "select",
      label: "Number gradient",
      options: [
        { label: "Blue to green", value: "blue-green" },
        { label: "Blue to orange", value: "blue-orange" },
        { label: "Orange to green", value: "orange-green" },
      ],
    },
    stats: {
      type: "array",
      label: "Stats",
      arrayFields: {
        value: { type: "text", label: "Value" },
        label: { type: "text", label: "Label" },
      },
      defaultItemProps: { value: "", label: "" },
      getItemSummary: (item) => item.label || item.value || "Stat",
    },
  },
  defaultProps: {
    backgroundColor: "dnet-dark",
    backgroundImage: "",
    backgroundImageAlt: "",
    gradient: "blue-green",
    stats: [],
  },
  render: (props) => <StatsBannerBlock {...props} />,
};

const image: ComponentConfig<ImageBlockProps> = {
  label: "Image",
  fields: {
    image: {
      type: "custom",
      label: "Image",
      render: ({ value, onChange }) => (
        <ImageUploadField value={value} onChange={onChange} />
      ),
    },
    alt: { type: "text", label: "Alt text" },
    width: WIDTH_FIELD,
  },
  defaultProps: { image: "", alt: "", width: "lg" },
  render: (props) => <ImageBlock {...props} />,
};

type ContainerFieldProps = Omit<ContainerBlockProps, "children" | "puck"> & {
  children: Slot;
};

const container: ComponentConfig<ContainerFieldProps> = {
  label: "Container (layout)",
  // Renders its own root node via `puck.dragRef` instead of Puck's default wrapper, so a
  // Container nested inside another Container's grid/flex slot becomes a true direct
  // grid/flex item — without this, an extra wrapper div breaks column/row sizing and makes
  // nested drops unreliable.
  inline: true,
  fields: {
    layout: {
      type: "select",
      label: "Layout",
      options: [
        { label: "Row (flex)", value: "flex-row" },
        { label: "Column (flex)", value: "flex-col" },
        { label: "Grid — 2 columns (50/50)", value: "grid-2" },
        { label: "Grid — 2 columns (60/40)", value: "grid-2-60-40" },
        { label: "Grid — 2 columns (70/30)", value: "grid-2-70-30" },
        { label: "Grid — 2 columns (40/60)", value: "grid-2-40-60" },
        { label: "Grid — 2 columns (30/70)", value: "grid-2-30-70" },
        { label: "Grid — 3 columns", value: "grid-3" },
        { label: "Grid — 4 columns", value: "grid-4" },
      ],
    },
    gap: {
      type: "select",
      label: "Gap",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
    padding: {
      type: "select",
      label: "Vertical padding",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
    color: COLOR_FIELD,
    children: { type: "slot" },
  },
  defaultProps: {
    layout: "flex-row",
    gap: "md",
    padding: "md",
    color: "none",
    children: [],
  },
  render: (props) => <ContainerBlock {...props} />,
};

const LAYOUT_FIELD = {
  type: "object" as const,
  label: "Layout",
  objectFields: {
    padding: {
      type: "select" as const,
      label: "Vertical padding",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
  },
};

type GridFieldProps = Omit<GridBlockProps, "children" | "puck"> & {
  children: Slot;
};

const grid: ComponentConfig<GridFieldProps> = {
  label: "Grid",
  // See the matching comment on the `container` config re: `inline: true` and nested drops.
  inline: true,
  fields: {
    columns: {
      type: "number",
      label: "Number of columns",
      min: 1,
      max: 6,
    },
    gap: {
      type: "number",
      label: "Gap",
      min: 0,
      max: 96,
      step: 4,
    },
    layout: LAYOUT_FIELD,
    color: COLOR_FIELD,
    children: { type: "slot" },
  },
  defaultProps: {
    columns: 2,
    gap: 24,
    layout: { padding: "md" },
    color: "none",
    children: [],
  },
  render: (props) => <GridBlock {...props} />,
};

type FlexFieldProps = Omit<FlexBlockProps, "children" | "puck"> & {
  children: Slot;
};

const flex: ComponentConfig<FlexFieldProps> = {
  label: "Flex",
  // See the matching comment on the `container` config re: `inline: true` and nested drops.
  inline: true,
  fields: {
    direction: {
      type: "radio",
      label: "Direction",
      options: [
        { label: "Row", value: "row" },
        { label: "Column", value: "col" },
      ],
    },
    justify: {
      type: "radio",
      label: "Justify content",
      options: [
        { label: "Start", value: "start" },
        { label: "Center", value: "center" },
        { label: "End", value: "end" },
      ],
    },
    gap: {
      type: "number",
      label: "Gap",
      min: 0,
      max: 96,
      step: 4,
    },
    wrap: {
      type: "radio",
      label: "Wrap",
      options: [
        { label: "Wrap", value: true },
        { label: "No wrap", value: false },
      ],
    },
    layout: LAYOUT_FIELD,
    color: COLOR_FIELD,
    children: { type: "slot" },
  },
  defaultProps: {
    direction: "row",
    justify: "start",
    gap: 24,
    wrap: true,
    layout: { padding: "md" },
    color: "none",
    children: [],
  },
  render: (props) => <FlexBlock {...props} />,
};

export const puckConfig = {
  // Suppresses Puck's built-in root "title" field — it would write to
  // `data.root.props.title`, disconnected from the `Page.title` column that
  // `PageMetaPanel` already edits, so a second unrelated field would be confusing.
  root: {
    fields: {},
  },
  categories: {
    layout: {
      title: "Layout",
      components: ["Grid", "Flex", "Space"],
      defaultExpanded: true,
    },
    text: {
      title: "Text",
      components: ["Heading", "Paragraph", "RichText"],
      defaultExpanded: true,
    },
    media: {
      title: "Media",
      components: ["Image", "Gallery", "ImageWithText"],
    },
    sections: {
      title: "Sections",
      components: [
        "Hero",
        "SectionHeading",
        "ServiceCards",
        "SolutionsCarousel",
        "StatsBanner",
        "CTABanner",
        "Accordion",
      ],
    },
  },
  components: {
    Hero: hero,
    SectionHeading: sectionHeading,
    ServiceCards: serviceCards,
    SolutionsCarousel: solutionsCarousel,
    StatsBanner: statsBanner,
    Heading: heading,
    Paragraph: paragraph,
    Image: image,
    RichText: richText,
    ImageWithText: imageWithText,
    CTABanner: ctaBanner,
    Gallery: gallery,
    Accordion: accordion,
    Grid: grid,
    Flex: flex,
    Space: spacer,
    // Legacy type, kept only so pages saved before the Grid/Flex/Space split
    // still resolve — intentionally absent from `categories`, so it's no
    // longer offered in the component picker.
    Container: container,
  },
};

export type PuckData = UserGenerics<typeof puckConfig>["UserData"];
