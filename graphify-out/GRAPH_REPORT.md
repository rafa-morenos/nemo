# Graph Report - .  (2026-07-27)

## Corpus Check
- Corpus is ~39,254 words - fits in a single context window. You may not need a graph.

## Summary
- 1350 nodes · 1902 edges · 98 communities (59 shown, 39 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.86)
- Token cost: 79,618 input · 0 output

## Community Hubs (Navigation)
- Flutter Nemo Design Tokens
- Web Card & Aspect Ratio
- Web Separator & Sheet
- Web Field Form Primitives
- React Native Fonts & Icons
- Web Badge Component
- Web devDependencies (package.json)
- Flutter KanbanCard Model Types
- Nemo Project Docs & Rationale
- Web Combobox Component
- Flutter KanbanTaskCard
- Web Attachment & Button
- Web Input & Switch
- Web TypeScript Config
- Web Carousel Component
- Web Item Component
- Web Chart Component
- Web Menubar Component
- Web Toggle & Toggle Group
- Web Bubble & Progress
- Web Context Menu Component
- Web Dropdown Menu Component
- Web Pagination Component
- Root package.json (Style Dictionary)
- React Native package.json
- Web Alert Dialog Component
- Web Empty State Component
- Artifact Build Script
- Web Dependencies (otp/lucide/radix)
- Web Breadcrumb Component
- Web Date Picker & Popover
- Web Drawer Component
- Web Input Group Component
- Web Navigation Menu Component
- Web Select Component
- Web Button Stories
- Web Alert Component
- Flutter Kanban Helper Widgets
- Web Input OTP Component
- Web Resizable Component
- Web Typography Foundations Story
- Web Accordion Component
- Web Avatar Component
- Web Calendar Component
- Web Button Group Component
- Web Checkbox Component
- Web Tabs Component
- Web Alias Colors Foundations Story
- Flutter Nemo Fonts
- Web Kbd Component
- Web Scroll Area Component
- Web Slider Component
- Web Spinner Component
- Web Textarea Component
- Web Colors Foundations Story
- Web Sonner Toast Component
- Web Radius & Spacing Foundations Story
- class-variance-authority Dependency
- clsx Dependency
- cmdk Dependency
- date-fns Dependency
- embla-carousel-react Dependency
- @radix-ui/react-alert-dialog Dependency
- @radix-ui/react-aspect-ratio Dependency
- @radix-ui/react-avatar Dependency
- @radix-ui/react-checkbox Dependency
- @radix-ui/react-collapsible Dependency
- @radix-ui/react-context-menu Dependency
- @radix-ui/react-dialog Dependency
- @radix-ui/react-dropdown-menu Dependency
- @radix-ui/react-hover-card Dependency
- @radix-ui/react-menubar Dependency
- @radix-ui/react-navigation-menu Dependency
- @radix-ui/react-popover Dependency
- @radix-ui/react-progress Dependency
- @radix-ui/react-radio-group Dependency
- @radix-ui/react-scroll-area Dependency
- @radix-ui/react-select Dependency
- @radix-ui/react-separator Dependency
- @radix-ui/react-slider Dependency
- @radix-ui/react-slot Dependency
- @radix-ui/react-switch Dependency
- @radix-ui/react-tabs Dependency
- @radix-ui/react-toggle Dependency
- @radix-ui/react-toggle-group Dependency
- @radix-ui/react-tooltip Dependency
- react-day-picker Dependency
- react-hook-form Dependency
- react-resizable-panels Dependency
- recharts Dependency
- sonner Dependency
- tailwind-merge Dependency
- @tanstack/react-table Dependency
- vaul Dependency
- Storybook Main Config
- Storybook Preview Config

## God Nodes (most connected - your core abstractions)
1. `cn()` - 91 edges
2. `Button` - 24 edges
3. `compilerOptions` - 13 edges
4. `base()` - 11 edges
5. `Input` - 8 edges
6. `build/build.mjs (Style Dictionary build script)` - 8 edges
7. `KanbanCard()` - 7 edges
8. `stroke()` - 7 edges
9. `buttonVariants` - 7 edges
10. `useNemoTheme()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `preview/index.html (static light/dark playground)` --semantically_similar_to--> `preview/nemo-artifact.html (static Artifact showcase)`  [INFERRED] [semantically similar]
  preview/index.html → CLAUDE.md
- `packages/web (Storybook + shadcn React components + tailwind.preset.js)` --references--> `storybook`  [EXTRACTED]
  CLAUDE.md → packages/web/package.json
- `NemoTokens (Flutter generated design tokens)` --shares_data_with--> `tokens/core.json (primitives, layout, typography)`  [INFERRED]
  README.md → CLAUDE.md
- `packages/flutter/pubspec.yaml (nemo_flutter package manifest)` --shares_data_with--> `NemoTokens (Flutter generated design tokens)`  [INFERRED]
  packages/flutter/pubspec.yaml → README.md
- `storybook` --references--> `packages/web/src/foundations/Overview.mdx (Foundations/Overview story)`  [EXTRACTED]
  packages/web/package.json → packages/web/src/foundations/Overview.mdx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Token build pipeline: Figma export -> tokens/ -> Style Dictionary -> platforms** — tokens_figma_export_tokens_json, build_import_figma_tokens_mjs, tokens_core_json, tokens_semantic_light_json, tokens_semantic_dark_json, build_build_mjs, packages_web, packages_react_native, packages_flutter [EXTRACTED 0.90]
- **KanbanCard/KanbanTaskCard mirrored across web, React Native, Flutter with Code Connect** — kanbancard_component, packages_web, packages_react_native, packages_flutter, code_connect [EXTRACTED 0.90]

## Communities (98 total, 39 thin omitted)

### Community 0 - "Flutter Nemo Design Tokens"
Cohesion: 0.01
Nodes (360): package:flutter/widgets.dart, borderWidthLg, borderWidthMd, borderWidthNone, borderWidthSm, colorBackgroundBg, colorBlue0, colorBlue10 (+352 more)

### Community 1 - "Web Card & Aspect Ratio"
Cohesion: 0.05
Nodes (55): Default, Story, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle (+47 more)

### Community 2 - "Web Separator & Sheet"
Cohesion: 0.06
Nodes (41): Separator, Default, Story, SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader() (+33 more)

### Community 3 - "Web Field Form Primitives"
Cohesion: 0.06
Nodes (35): Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldProps (+27 more)

### Community 4 - "React Native Fonts & Icons"
Cohesion: 0.10
Nodes (33): nemoFontAssets, nemoFontFamily, useNemoFonts(), CheckIcon(), ChevronDownIcon(), ChevronUpIcon(), ClockIcon(), PersonIcon() (+25 more)

### Community 5 - "Web Badge Component"
Cohesion: 0.07
Nodes (34): Badge(), BadgeProps, badgeVariants, Default, Story, Variants, DataTable(), DataTableProps (+26 more)

### Community 6 - "Web devDependencies (package.json)"
Cohesion: 0.05
Nodes (40): autoprefixer, @figma/code-connect, description, devDependencies, autoprefixer, @figma/code-connect, postcss, react (+32 more)

### Community 7 - "Flutter KanbanCard Model Types"
Cohesion: 0.05
Nodes (39): Color, IconData?, KanbanAssignment, KanbanMode, KanbanUrgency, a, address, AssignTone (+31 more)

### Community 8 - "Nemo Project Docs & Rationale"
Cohesion: 0.08
Nodes (33): build/build.mjs (Style Dictionary build script), build/import-figma-tokens.mjs (Tokens Studio to tokens/ importer), build/manifest.json, CLAUDE.md (Nemo project agent guide), Figma Code Connect (design-to-code mapping), Brand blue "mar azulão" (#0069ff / blue.700 #001e6b anchor), Nemo CSS custom properties (--nemo-color-*, --nemo-space-*, --nemo-radius-*, --nemo-font-*), Lemon Pie case study (design system from tokens, not components) (+25 more)

### Community 9 - "Web Combobox Component"
Cohesion: 0.11
Nodes (24): Combobox(), ComboboxOption, ComboboxProps, Default, options, Story, Command, CommandEmpty (+16 more)

### Community 10 - "Flutter KanbanTaskCard"
Cohesion: 0.07
Nodes (29): int?, List, nemo_fonts.dart, nemo_tokens.dart, package:flutter/material.dart, assignees, build, checked (+21 more)

### Community 11 - "Web Attachment & Button"
Cohesion: 0.11
Nodes (14): Attachment, AttachmentProps, Default, Story, Button, ButtonProps, Default, Story (+6 more)

### Community 12 - "Web Input & Switch"
Cohesion: 0.10
Nodes (18): Default, Disabled, Story, WithLabel, Default, Off, Story, WithLabels (+10 more)

### Community 13 - "Web TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+10 more)

### Community 14 - "Web Carousel Component"
Cohesion: 0.15
Nodes (14): Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext, CarouselOptions (+6 more)

### Community 15 - "Web Item Component"
Cohesion: 0.18
Nodes (14): Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemGroup, ItemHeader, ItemMedia (+6 more)

### Community 16 - "Web Chart Component"
Cohesion: 0.16
Nodes (10): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, Bars, data (+2 more)

### Community 17 - "Web Menubar Component"
Cohesion: 0.20
Nodes (13): Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator, MenubarShortcut() (+5 more)

### Community 18 - "Web Toggle & Toggle Group"
Cohesion: 0.17
Nodes (11): Multiple, Single, Story, ToggleGroup, ToggleGroupContext, ToggleGroupItem, Default, Story (+3 more)

### Community 19 - "Web Bubble & Progress"
Cohesion: 0.18
Nodes (8): Bubble, BubbleProps, Conversation, Story, Progress, Animated, Default, Story

### Community 20 - "Web Context Menu Component"
Cohesion: 0.21
Nodes (11): ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut(), ContextMenuSubContent (+3 more)

### Community 21 - "Web Dropdown Menu Component"
Cohesion: 0.22
Nodes (11): DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut(), DropdownMenuSubContent (+3 more)

### Community 22 - "Web Pagination Component"
Cohesion: 0.31
Nodes (11): Pagination(), PaginationContent, PaginationEllipsis(), PaginationItem, PaginationLink(), PaginationLinkProps, PaginationNext(), PaginationPrevious() (+3 more)

### Community 23 - "Root package.json (Style Dictionary)"
Cohesion: 0.17
Nodes (11): description, devDependencies, style-dictionary, name, private, scripts, build:tokens, clean (+3 more)

### Community 24 - "React Native package.json"
Cohesion: 0.17
Nodes (11): description, react, main, name, peerDependencies, react, react-native, react-native-svg (+3 more)

### Community 25 - "Web Alert Dialog Component"
Cohesion: 0.27
Nodes (10): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle (+2 more)

### Community 26 - "Web Empty State Component"
Cohesion: 0.26
Nodes (10): Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyMediaProps, emptyMediaVariants, EmptyTitle (+2 more)

### Community 27 - "Artifact Build Script"
Cohesion: 0.18
Nodes (10): b64(), darkInner, darkRaw, __dirname, face(), fontsCss, html, lightCss (+2 more)

### Community 28 - "Web Dependencies (otp/lucide/radix)"
Cohesion: 0.18
Nodes (11): input-otp, lucide-react, dependencies, input-otp, lucide-react, @radix-ui/react-accordion, @radix-ui/react-direction, @radix-ui/react-label (+3 more)

### Community 29 - "Web Breadcrumb Component"
Cohesion: 0.29
Nodes (9): Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator(), Default (+1 more)

### Community 30 - "Web Date Picker & Popover"
Cohesion: 0.24
Nodes (7): DatePicker(), DatePickerProps, Default, Story, PopoverContent, Default, Story

### Community 31 - "Web Drawer Component"
Cohesion: 0.29
Nodes (9): Drawer(), DrawerContent, DrawerDescription, DrawerFooter(), DrawerHeader(), DrawerOverlay, DrawerTitle, Default (+1 more)

### Community 32 - "Web Input Group Component"
Cohesion: 0.25
Nodes (9): InputGroup, InputGroupAddon, InputGroupAddonProps, inputGroupAddonVariants, InputGroupButton, InputGroupInput, InputGroupText, Default (+1 more)

### Community 33 - "Web Navigation Menu Component"
Cohesion: 0.27
Nodes (9): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport, Default (+1 more)

### Community 34 - "Web Select Component"
Cohesion: 0.25
Nodes (9): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, Default (+1 more)

### Community 35 - "Web Button Stories"
Cohesion: 0.20
Nodes (9): AllVariants, Default, Destructive, Ghost, Link, Outline, Secondary, Sizes (+1 more)

### Community 36 - "Web Alert Component"
Cohesion: 0.31
Nodes (7): Alert, AlertDescription, AlertTitle, alertVariants, Default, Destructive, Story

### Community 37 - "Flutter Kanban Helper Widgets"
Cohesion: 0.25
Nodes (8): _Assignment, _Divider, _GroupedButton, KanbanCard, _Pill, _ChecklistRow, KanbanTaskCard, StatelessWidget

### Community 38 - "Web Input OTP Component"
Cohesion: 0.39
Nodes (6): InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, Default, Story

### Community 39 - "Web Resizable Component"
Cohesion: 0.32
Nodes (5): ResizableHandle(), ResizablePanelGroup(), Horizontal, Story, Vertical

### Community 40 - "Web Typography Foundations Story"
Cohesion: 0.25
Nodes (6): FAMILIES, SizeScale, Story, Tok, tokens, Weights

### Community 41 - "Web Accordion Component"
Cohesion: 0.43
Nodes (5): AccordionContent, AccordionItem, AccordionTrigger, Default, Story

### Community 42 - "Web Avatar Component"
Cohesion: 0.43
Nodes (5): Avatar, AvatarFallback, AvatarImage, Default, Story

### Community 43 - "Web Calendar Component"
Cohesion: 0.38
Nodes (5): buttonVariants, Calendar(), CalendarProps, Default, Story

### Community 44 - "Web Button Group Component"
Cohesion: 0.33
Nodes (5): ButtonGroup, ButtonGroupProps, Horizontal, Story, Vertical

### Community 45 - "Web Checkbox Component"
Cohesion: 0.33
Nodes (5): Checkbox, Default, Disabled, Story, WithLabel

### Community 46 - "Web Tabs Component"
Cohesion: 0.43
Nodes (5): Default, Story, TabsContent, TabsList, TabsTrigger

### Community 47 - "Web Alias Colors Foundations Story"
Cohesion: 0.29
Nodes (5): All, GROUPS, Story, Tok, tokens

### Community 48 - "Flutter Nemo Fonts"
Cohesion: 0.33
Nodes (5): display, heading, NemoFonts, sans, static const String

### Community 49 - "Web Kbd Component"
Cohesion: 0.47
Nodes (4): Kbd, KbdGroup, Default, Story

### Community 50 - "Web Scroll Area Component"
Cohesion: 0.40
Nodes (4): ScrollArea, ScrollBar, Default, Story

### Community 51 - "Web Slider Component"
Cohesion: 0.40
Nodes (4): Slider, Default, Range, Story

### Community 52 - "Web Spinner Component"
Cohesion: 0.40
Nodes (4): Spinner(), InButton, Sizes, Story

### Community 53 - "Web Textarea Component"
Cohesion: 0.40
Nodes (4): Default, Disabled, Story, Textarea

### Community 54 - "Web Colors Foundations Story"
Cohesion: 0.33
Nodes (3): Primitives, Story, TONES

### Community 55 - "Web Sonner Toast Component"
Cohesion: 0.50
Nodes (3): Default, Story, Toaster()

### Community 56 - "Web Radius & Spacing Foundations Story"
Cohesion: 0.50
Nodes (3): Radius, Spacing, Story

## Knowledge Gaps
- **802 isolated node(s):** `name`, `version`, `private`, `type`, `description` (+797 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **39 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Web Pagination Component` to `Web Card & Aspect Ratio`, `Web Separator & Sheet`, `Web Field Form Primitives`, `Web Badge Component`, `Web Combobox Component`, `Web Attachment & Button`, `Web Input & Switch`, `Web Carousel Component`, `Web Item Component`, `Web Chart Component`, `Web Menubar Component`, `Web Toggle & Toggle Group`, `Web Bubble & Progress`, `Web Context Menu Component`, `Web Dropdown Menu Component`, `Web Alert Dialog Component`, `Web Empty State Component`, `Web Breadcrumb Component`, `Web Date Picker & Popover`, `Web Drawer Component`, `Web Input Group Component`, `Web Navigation Menu Component`, `Web Select Component`, `Web Alert Component`, `Web Input OTP Component`, `Web Resizable Component`, `Web Accordion Component`, `Web Avatar Component`, `Web Calendar Component`, `Web Button Group Component`, `Web Checkbox Component`, `Web Tabs Component`, `Web Kbd Component`, `Web Scroll Area Component`, `Web Slider Component`, `Web Spinner Component`, `Web Textarea Component`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Web Dependencies (otp/lucide/radix)` to `Web devDependencies (package.json)`, `class-variance-authority Dependency`, `clsx Dependency`, `cmdk Dependency`, `date-fns Dependency`, `embla-carousel-react Dependency`, `@radix-ui/react-alert-dialog Dependency`, `@radix-ui/react-aspect-ratio Dependency`, `@radix-ui/react-avatar Dependency`, `@radix-ui/react-checkbox Dependency`, `@radix-ui/react-collapsible Dependency`, `@radix-ui/react-context-menu Dependency`, `@radix-ui/react-dialog Dependency`, `@radix-ui/react-dropdown-menu Dependency`, `@radix-ui/react-hover-card Dependency`, `@radix-ui/react-menubar Dependency`, `@radix-ui/react-navigation-menu Dependency`, `@radix-ui/react-popover Dependency`, `@radix-ui/react-progress Dependency`, `@radix-ui/react-radio-group Dependency`, `@radix-ui/react-scroll-area Dependency`, `@radix-ui/react-select Dependency`, `@radix-ui/react-separator Dependency`, `@radix-ui/react-slider Dependency`, `@radix-ui/react-slot Dependency`, `@radix-ui/react-switch Dependency`, `@radix-ui/react-tabs Dependency`, `@radix-ui/react-toggle Dependency`, `@radix-ui/react-toggle-group Dependency`, `@radix-ui/react-tooltip Dependency`, `react-day-picker Dependency`, `react-hook-form Dependency`, `react-resizable-panels Dependency`, `recharts Dependency`, `sonner Dependency`, `tailwind-merge Dependency`, `@tanstack/react-table Dependency`, `vaul Dependency`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Why does `Button` connect `Web Attachment & Button` to `Web Card & Aspect Ratio`, `Web Separator & Sheet`, `Web Button Stories`, `Web Field Form Primitives`, `Web Combobox Component`, `Web Button Group Component`, `Web Carousel Component`, `Web Item Component`, `Web Spinner Component`, `Web Dropdown Menu Component`, `Web Sonner Toast Component`, `Web Alert Dialog Component`, `Web Empty State Component`, `Web Date Picker & Popover`, `Web Drawer Component`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _802 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Flutter Nemo Design Tokens` be split into smaller, more focused modules?**
  _Cohesion score 0.00554016620498615 - nodes in this community are weakly interconnected._
- **Should `Web Card & Aspect Ratio` be split into smaller, more focused modules?**
  _Cohesion score 0.05217391304347826 - nodes in this community are weakly interconnected._
- **Should `Web Separator & Sheet` be split into smaller, more focused modules?**
  _Cohesion score 0.0611764705882353 - nodes in this community are weakly interconnected._