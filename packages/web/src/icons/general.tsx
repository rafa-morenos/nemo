import * as React from "react";

/**
 * Daki `icons-DakiApp/General` — real assets exported from the Figma file
 * "Daki App • Components — Design in Progress" (fileKey gMIOymdWtLy8QnSXQ3eE0V),
 * not hand-drawn. Each component is the exact vector path data, sized via CSS
 * (no hardcoded width/height) so it behaves like lucide-react.
 *
 * Notes on a few icons:
 * - Chevron down/up, checkmark, and minus share a single underlying Figma
 *   vector ("Vector 631 (Stroke)") that Figma rotates per-instance via a
 *   wrapper transform (not baked into the exported asset itself). To stay
 *   visually faithful, the same rotation has been baked into the path via an
 *   SVG `transform`, with the viewBox re-derived for the rotated bounding box.
 * - "location" is authored in Figma as a navigation-arrow glyph placed in an
 *   oversized rotated container (rotate 45°) inside the 24x24 frame; the
 *   rotation + offset has likewise been baked into the path/viewBox here.
 */

export function Daki3DotsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 18 4" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M2 4C3.10457 4 4 3.10457 4 2C4 0.895431 3.10457 0 2 0C0.895431 0 0 0.895431 0 2C0 3.10457 0.895431 4 2 4Z" fill="currentColor" />
      <path d="M9 4C10.1046 4 11 3.10457 11 2C11 0.895431 10.1046 0 9 0C7.89543 0 7 0.895431 7 2C7 3.10457 7.89543 4 9 4Z" fill="currentColor" />
      <path d="M16 4C17.1046 4 18 3.10457 18 2C18 0.895431 17.1046 0 16 0C14.8954 0 14 0.895431 14 2C14 3.10457 14.8954 4 16 4Z" fill="currentColor" />
    </svg>
  );
}

export function DakiChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 21 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        transform="translate(10.5,6) rotate(90) translate(-6,-10.5)"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.439341 0.43934C1.02513 -0.146447 1.97488 -0.146447 2.56066 0.43934L11.5607 9.43934C12.1464 10.0251 12.1464 10.9749 11.5607 11.5607L2.56066 20.5607C1.97487 21.1464 1.02513 21.1464 0.43934 20.5607C-0.146447 19.9749 -0.146447 19.0251 0.43934 18.4393L8.37868 10.5L0.439341 2.56066C-0.146445 1.97487 -0.146445 1.02513 0.439341 0.43934Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DakiChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        transform="translate(12,0) scale(-1,1)"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.439341 0.43934C1.02513 -0.146447 1.97488 -0.146447 2.56066 0.43934L11.5607 9.43934C12.1464 10.0251 12.1464 10.9749 11.5607 11.5607L2.56066 20.5607C1.97487 21.1464 1.02513 21.1464 0.43934 20.5607C-0.146447 19.9749 -0.146447 19.0251 0.43934 18.4393L8.37868 10.5L0.439341 2.56066C-0.146445 1.97487 -0.146445 1.02513 0.439341 0.43934Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DakiChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.439341 0.43934C1.02513 -0.146447 1.97488 -0.146447 2.56066 0.43934L11.5607 9.43934C12.1464 10.0251 12.1464 10.9749 11.5607 11.5607L2.56066 20.5607C1.97487 21.1464 1.02513 21.1464 0.43934 20.5607C-0.146447 19.9749 -0.146447 19.0251 0.43934 18.4393L8.37868 10.5L0.439341 2.56066C-0.146445 1.97487 -0.146445 1.02513 0.439341 0.43934Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DakiChevronUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 21 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        transform="translate(10.5,6) rotate(-90) translate(-6,-10.5)"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.439341 0.43934C1.02513 -0.146447 1.97488 -0.146447 2.56066 0.43934L11.5607 9.43934C12.1464 10.0251 12.1464 10.9749 11.5607 11.5607L2.56066 20.5607C1.97487 21.1464 1.02513 21.1464 0.43934 20.5607C-0.146447 19.9749 -0.146447 19.0251 0.43934 18.4393L8.37868 10.5L0.439341 2.56066C-0.146445 1.97487 -0.146445 1.02513 0.439341 0.43934Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DakiArrowDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 19.5 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.24994 16.1664L2.56066 10.1893C1.97487 9.60354 1.02513 9.60354 0.439341 10.1893C-0.146447 10.7751 -0.146447 11.7249 0.43934 12.3107L8.68934 20.5607C8.98223 20.8535 9.36612 21 9.75 21C10.1339 21 10.5178 20.8535 10.8107 20.5607L19.0607 12.3107C19.6464 11.7249 19.6464 10.7751 19.0607 10.1893C18.4749 9.60355 17.5251 9.60355 16.9393 10.1893L11.2499 16.1665L11.2499 1.5C11.2499 0.671572 10.5784 0 9.74995 0C8.92152 0 8.24995 0.671572 8.24995 1.5L8.24994 16.1664Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DakiArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 21 19.5" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.68934 0.43934C9.27513 -0.146447 10.2249 -0.146447 10.8107 0.43934C11.3964 1.02513 11.3964 1.97487 10.8107 2.56066L4.83357 8.25L19.5 8.25C20.3284 8.25 21 8.92157 21 9.75C21 10.5784 20.3284 11.25 19.5 11.25L4.83357 11.25L10.8107 16.9393C11.3964 17.5251 11.3964 18.4749 10.8107 19.0607C10.2249 19.6464 9.27513 19.6464 8.68934 19.0607L0.43934 10.8107C-0.146447 10.2249 -0.146447 9.27513 0.43934 8.68934L8.68934 0.43934Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DakiArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 21 19.5" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12.3107 0.43934C11.7249 -0.146447 10.7751 -0.146447 10.1894 0.43934C9.60357 1.02513 9.60357 1.97487 10.1894 2.56066L16.1664 8.25L1.5 8.25C0.671572 8.25 0 8.92157 0 9.75C0 10.5784 0.671572 11.25 1.5 11.25L16.1664 11.25L10.1894 16.9393C9.60357 17.5251 9.60357 18.4749 10.1894 19.0607C10.7751 19.6464 11.7249 19.6464 12.3107 19.0607L20.5607 10.8107C21.1465 10.2249 21.1465 9.27513 20.5607 8.68934L12.3107 0.43934Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DakiArrowUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 19.5 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M19.0607 8.68934C19.6464 9.27513 19.6464 10.2249 19.0607 10.8107C18.4749 11.3964 17.5251 11.3964 16.9393 10.8107L11.25 4.83357L11.25 19.5C11.25 20.3284 10.5784 21 9.75001 21C8.92158 21 8.25 20.3284 8.25 19.5L8.25 4.83357L2.56066 10.8107C1.97487 11.3964 1.02513 11.3964 0.439341 10.8107C-0.146447 10.2249 -0.146447 9.27513 0.43934 8.68934L8.68934 0.43934C8.98223 0.146446 9.36612 0 9.75 0C10.1339 0 10.5178 0.146447 10.8107 0.43934L19.0607 8.68934Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DakiCheckmarkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 10.8631" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        transform="translate(8,5.43155) rotate(90) translate(-5.43155,-8)"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.335439 0.335437C0.782689 -0.111813 1.50782 -0.111812 1.95507 0.335439L10.5277 8.90806C10.9749 9.35531 10.9749 10.0804 10.5277 10.5277L5.39084 15.6646C4.94359 16.1118 4.21845 16.1118 3.7712 15.6646C3.32395 15.2173 3.32395 14.4922 3.7712 14.0449L8.09823 9.71788L0.335437 1.95507C-0.111813 1.50782 -0.111812 0.782686 0.335439 0.335437Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DakiCloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M17.1548 0.488155C17.8057 -0.162718 18.861 -0.162718 19.5118 0.488155C20.1627 1.13903 20.1627 2.1943 19.5118 2.84518L12.357 10L19.5118 17.1548C20.1627 17.8057 20.1627 18.861 19.5118 19.5118C18.861 20.1627 17.8057 20.1627 17.1548 19.5118L10 12.357L2.84518 19.5118C2.1943 20.1627 1.13903 20.1627 0.488156 19.5118C-0.162719 18.861 -0.162719 17.8057 0.488156 17.1548L7.64298 10L0.488156 2.84518C-0.162718 2.1943 -0.162718 1.13903 0.488156 0.488155C1.13903 -0.162718 2.19431 -0.162718 2.84518 0.488155L10 7.64298L17.1548 0.488155Z" fill="currentColor" />
    </svg>
  );
}

export function DakiInfoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM2.4 12C2.4 6.69807 6.69807 2.4 12 2.4C17.3019 2.4 21.6 6.69807 21.6 12C21.6 17.3019 17.3019 21.6 12 21.6C6.69807 21.6 2.4 17.3019 2.4 12Z"
        fill="currentColor"
      />
      <path
        d="M10.9485 7.1087C11.2542 7.36957 11.6096 7.5 12.015 7.5C12.407 7.5 12.7525 7.36622 13.0515 7.09866C13.3505 6.8311 13.5 6.46321 13.5 5.99498C13.5 5.57358 13.3571 5.21906 13.0714 4.93144C12.7857 4.64381 12.4336 4.5 12.015 4.5C11.5897 4.5 11.2309 4.64381 10.9385 4.93144C10.6462 5.21906 10.5 5.57358 10.5 5.99498C10.5 6.4699 10.6495 6.84114 10.9485 7.1087Z"
        fill="currentColor"
      />
      <path
        d="M12.0154 9.59985C12.4338 9.59992 12.7859 9.73154 13.0715 9.99463C13.3147 10.2187 13.4535 10.4876 13.4897 10.8003H13.4949V10.8582C13.4976 10.8944 13.5 10.9313 13.5 10.9688C13.5 11.0099 13.4976 11.0501 13.4949 11.0896V17.606C13.4976 17.6423 13.5 17.6791 13.5 17.7166C13.5 17.758 13.4977 17.7984 13.4949 17.8381V18H13.4751C13.4218 18.2963 13.2813 18.5385 13.0518 18.7266C12.7528 18.9714 12.4073 19.0942 12.0154 19.0942C11.61 19.0942 11.2539 18.9749 10.9482 18.7361C10.7178 18.5472 10.5769 18.3017 10.5242 18H10.5V10.8003H10.5103C10.5473 10.4875 10.6899 10.2187 10.9387 9.99463C11.2311 9.73148 11.5902 9.59985 12.0154 9.59985Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DakiLocationIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        transform="rotate(45 14.967 9.287) translate(5.303 -1.099)"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.66323 0C10.0533 0 10.4077 0.226791 10.5712 0.580942L19.2344 19.3512C19.4052 19.7214 19.3342 20.1583 19.0549 20.4553C18.7756 20.7523 18.344 20.8501 17.964 20.7023L9.66323 17.4742L1.36247 20.7023C0.982469 20.8501 0.550805 20.7523 0.271504 20.4553C-0.00779682 20.1583 -0.0787967 19.7214 0.0920627 19.3512L8.75527 0.580942C8.91872 0.226791 9.27317 0 9.66323 0ZM2.94586 17.9406L9.30078 15.4692C9.53391 15.3786 9.79254 15.3786 10.0257 15.4692L16.3806 17.9406L9.66323 3.3863L2.94586 17.9406Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DakiMinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 21 3" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        transform="translate(10.5,1.5) rotate(-90) translate(-1.5,-10.5)"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.5 0C2.32843 0 3 0.671573 3 1.5V19.5C3 20.3284 2.32843 21 1.5 21C0.671573 21 0 20.3284 0 19.5V1.5C0 0.671573 0.671573 0 1.5 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DakiPlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 1.5C12 0.671573 11.3284 0 10.5 0C9.67157 0 9 0.671573 9 1.5V9H1.5C0.671573 9 0 9.67157 0 10.5C0 11.3284 0.671573 12 1.5 12H9V19.5C9 20.3284 9.67157 21 10.5 21C11.3284 21 12 20.3284 12 19.5V12H19.5C20.3284 12 21 11.3284 21 10.5C21 9.67157 20.3284 9 19.5 9H12V1.5Z" fill="currentColor" />
    </svg>
  );
}

export function DakiRefreshIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 19.6847 19.3691" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.36825 5.79957C4.70348 3.52528 7.17461 2 10.0001 2C14.2442 2 17.6847 5.44049 17.6847 9.68454C17.6847 13.9286 14.2442 17.3691 10.0001 17.3691C6.06556 17.3691 2.82038 14.4112 2.36926 10.5983C2.30437 10.0499 1.80715 9.65784 1.25869 9.72274C0.710233 9.78763 0.318223 10.2848 0.383115 10.8333C0.951927 15.6409 5.03992 19.3691 10.0001 19.3691C15.3488 19.3691 19.6847 15.0332 19.6847 9.68454C19.6847 4.33592 15.3488 0 10.0001 0C6.59162 0 3.596 1.76057 1.87038 4.42004L1.97669 2.0567C1.97669 1.51086 1.53419 1.06836 0.988345 1.06836C0.442497 1.06836 0 1.51086 0 2.0567V6.69641C0 7.24225 0.442497 7.68475 0.988345 7.68475H5.62805C6.17389 7.68475 6.61639 7.24225 6.61639 6.69641C6.61639 6.15056 6.17389 5.70806 5.62805 5.70806L3.36825 5.79957Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DakiShareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M9 14V3.10156L6.70711 5.70711C6.31658 6.09763 5.68342 6.09763 5.29289 5.70711C4.90237 5.31658 4.90237 4.68342 5.29289 4.29289L9.29289 0.292893C9.68342 -0.097631 10.3166 -0.097631 10.7071 0.292893L14.7071 4.29289C15.0976 4.68342 15.0976 5.31658 14.7071 5.70711C14.3166 6.09763 13.6834 6.09763 13.2929 5.70711L11 3.10156V14C11 14.5523 10.5523 15 10 15C9.44772 15 9 14.5523 9 14Z"
        fill="currentColor"
      />
      <path
        d="M2 12C2 11.4477 2.44772 11 3 11H8V9H3C1.34315 9 0 10.3431 0 12V17C0 18.6569 1.34315 20 3 20H17C18.6569 20 20 18.6569 20 17V12C20 10.3431 18.6569 9 17 9H12V11H17C17.5523 11 18 11.4477 18 12V17C18 17.5523 17.5523 18 17 18H3C2.44772 18 2 17.5523 2 17V12Z"
        fill="currentColor"
      />
    </svg>
  );
}
