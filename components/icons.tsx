import {
   Github,
   Apple,
   Loader2,
   LogOut,
   User2,
   SunMoon,
   LayoutDashboard,
   Pen,
   Settings,
   Search,
   ChevronLeft,
   LucideProps,
} from "lucide-react"

export const Icons = {
   github: Github,
   apple: Apple,
   spinner: Loader2,
   signOut: LogOut,
   user: User2,
   theme: SunMoon,
   create: Pen,
   dashboard: LayoutDashboard,
   settings: Settings,
   search: Search,
   chevronLeft: ChevronLeft,
   logo: (props: LucideProps) => (
      <svg
         viewBox="0 0 67 67"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         {...props}
      >
         <g clip-path="url(#clip0_5_69)">
            <path
               d="M16.2667 1.19999C2.80005 3.46665 0.800049 7.59999 0.800049 33.3333C0.800049 54.8 1.86672 58.9333 8.66672 62.8C13.2 65.3333 27.7334 66.8 28.2667 64.6667C28.5334 63.8667 24.8001 62.8 20 62.2667C15.3334 61.7333 10.5334 60.5333 9.46672 59.6C5.60005 56.4 4.00005 49.4667 4.00005 36V22.6667H33.3334H62.6667V26.8C62.6667 29.4667 63.2001 30.6667 64.4001 30.2667C65.4667 29.8667 65.8667 27.2 65.6001 21.2C64.6667 4.53332 60.6667 1.46665 38.5334 0.666653C30.1334 0.399986 20.1334 0.666653 16.2667 1.19999ZM24.9334 5.86665C24.5334 6.93332 22.6667 10.2667 20.6667 13.2C17.4667 18.4 16.9334 18.6667 10.8 18.6667C4.53338 18.6667 4.40005 18.5333 5.06672 14.9333C5.33338 12.9333 6.40005 10.5333 7.20005 9.46665C10.8 4.79999 26.5334 1.73332 24.9334 5.86665ZM45.3334 5.06665C45.3334 5.59999 43.6001 8.93332 41.3334 12.4L37.3334 18.6667H29.3334H21.3334L24.8001 12.9333C26.8001 9.86665 28.9334 6.53332 29.7334 5.59999C31.0667 3.86665 45.3334 3.33332 45.3334 5.06665ZM58.8001 9.33332C60.0001 11.2 61.4667 14 62.0001 15.6C62.8001 18.6667 62.6667 18.6667 52.1334 18.6667H41.4667L45.6001 12C49.0667 6.39999 50.4001 5.33332 53.0667 5.59999C54.9334 5.86665 57.4667 7.46665 58.8001 9.33332Z"
               fill="#EA580C"
            />
            <path
               d="M46.5334 43.6C40.1334 50 37.0667 54.4 35.8667 58.4C34.5334 63.2 34.5334 64.4 36.0001 65.3333C39.6001 67.4667 48.6667 62.6667 56.9334 54.2667C66.5334 44.5333 67.8667 41.2 64.1334 37.4667C59.4667 32.8 56.2667 34 46.5334 43.6ZM62.2667 40.8C63.4667 43.8667 60.5334 46.1333 58.0001 44C56.9334 43.0667 56.0001 41.4667 56.0001 40.5333C56.0001 38 61.2001 38.1333 62.2667 40.8ZM51.8667 54C48.6667 57.2 44.4001 60.2667 42.2667 60.8C38.6667 61.6 38.6667 61.6 40.0001 57.8667C40.8001 55.7333 44.0001 51.4667 46.9334 48.4L52.5334 42.6667L55.0667 45.4667C57.7334 48.2667 57.7334 48.2667 51.8667 54Z"
               fill="#EA580C"
            />
         </g>
         <defs>
            <clipPath id="clip0_5_69">
               <rect width="66.6667" height="66.6667" fill="white" />
            </clipPath>
         </defs>
      </svg>
   ),
   google: ({ ...props }: LucideProps) => (
      <svg
         aria-hidden="true"
         focusable="false"
         data-prefix="fab"
         data-icon="google"
         role="img"
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 488 512"
         {...props}
      >
         <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
         ></path>
      </svg>
   ),
}
