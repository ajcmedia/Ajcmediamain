import type { Service } from "@/types/site";

type IconProps = {
  className?: string;
};

export function CalendarIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">
      <path d="M8 2v3M16 2v3M3.5 9.5h17M5 5h14a1.5 1.5 0 0 1 1.5 1.5v13A1.5 1.5 0 0 1 19 21H5a1.5 1.5 0 0 1-1.5-1.5v-13A1.5 1.5 0 0 1 5 5Z" />
    </svg>
  );
}

export function GalleryIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">
      <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5v9A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9Z" />
      <path d="m6.5 16 3.2-3.2 2.5 2.5 2.7-3.7L18 16" />
      <path d="M8 9h.01" />
    </svg>
  );
}

export function ServiceIcon({ icon, className = "h-6 w-6" }: IconProps & { icon: Service["icon"] }) {
  const icons = {
    camera: (
      <>
        <path d="M4 9a3 3 0 0 1 3-3h1.4l1.1-1.7A2 2 0 0 1 11.2 3h1.6a2 2 0 0 1 1.7 1.3L15.6 6H17a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V9Z" />
        <path d="M9 13a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z" />
      </>
    ),
    event: (
      <>
        <path d="M8 21h8M12 17v4M7 4h10v7a5 5 0 0 1-10 0V4Z" />
        <path d="M5 7H3v2a4 4 0 0 0 4 4M19 7h2v2a4 4 0 0 1-4 4" />
      </>
    ),
    portrait: (
      <>
        <path d="M18 20a6 6 0 0 0-12 0" />
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      </>
    ),
    content: (
      <>
        <path d="M3 11h18M5 7h14M7 15h10M9 19h6" />
      </>
    )
  };

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">
      {icons[icon]}
    </svg>
  );
}

export function FacebookIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 8h3V4h-3c-3.3 0-5 2-5 5v2H6v4h3v7h4v-7h3.3l.7-4h-4V9c0-.7.3-1 1-1Z" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17" cy="7" r="1" />
    </svg>
  );
}

export function MessengerIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 3C7 3 3.2 6.5 3.2 11.1c0 2.4 1 4.5 2.8 6l-.4 3.9 3.5-1.9c.9.3 1.9.4 2.9.4 5 0 8.8-3.5 8.8-8.1S17 3 12 3Z" />
      <path d="m7.8 13.2 2.7-2.9 2.4 2.1 3.3-3.5-2.8 4.7-2.5-2.1-3.1 1.7Z" />
    </svg>
  );
}
