import {
   Body,
   Container,
   Head,
   Heading,
   Hr,
   Html,
   Link,
   Preview,
   Section,
   Tailwind,
   Text,
} from "@react-email/components"

interface MagicLinkEmailProps {
   magicLink: string
}

export default function MagicLinkEmail({ magicLink }: MagicLinkEmailProps) {
   return (
      <Html>
         <Head>
            <title>Sign in to Noted</title>
         </Head>
         <Preview>Unlock Your Noted Account-- Magic link</Preview>
         <Tailwind>
            <Body className="font-sans bg-white">
               <Container className="mx-auto max-w-2xl px-4 py-10">
                  <Heading className="text-2xl font-semibold pt-10">
                     🪄 Your magic link
                  </Heading>

                  <Section>
                     <Text className="text-base">
                        <Link className="text-accent" href={magicLink}>
                           👉 Click here to sign in 👈
                        </Link>
                     </Text>
                     <Text className="text-base">
                        If you didn't request this, please ignore this email.
                     </Text>
                  </Section>
                  <Text>
                     Best,
                     <br />- Noted
                  </Text>
                  <Hr className="my-4 bg-[#ddd]" />
               </Container>
            </Body>
         </Tailwind>
      </Html>
   )
}
