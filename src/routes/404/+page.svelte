<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
  import { page } from "$app/stores";
  import BackLink from "$lib/components/BackLink.svelte";
  import ConfusedTravolta from "$lib/components/ConfusedTravolta.svelte";
  import { truncateBySentence } from "$lib/functions";

  const original404ErrorMessage = "Page non trouvée";
  const code = $page.error?.message === original404ErrorMessage ? 404 : 500;
  const message =
    $page.error?.message === original404ErrorMessage
      ? "Page non trouvée"
      : "Il y a une erreur";

  const intro =
    "Je suis Antoine Greuzard, développeur web. Création de site internet pour les agences web. J'ai à mon actif plus de 100 projets terminés et une expérience de 8 ans dans le domaine du développement web.";
  const meta = {
    title: `${code}: ${message} | Antoine Greuzard`,
    description: truncateBySentence(intro, 155),
    url: "https://antoinegreuzard.fr/404",
    siteName: "Antoine Greuzard",
    image: {
      url: "https://antoinegreuzard.fr/antoinegreuzard-profile.jpeg",
      width: 746,
      height: 1020,
      alt: "Antoine greuzard: A propos, Projets, et Contact",
    },
  };
</script>

<MetaTags
  canonical={meta.url}
  description={meta.description}
  openGraph={{
    article: {
      authors: [meta.siteName],
    },
    description: meta.description,
    images: [
      {
        ...meta.image,
      },
    ],
    site_name: meta.siteName,
    title: meta.title,
    type: "article",
    url: meta.url,
  }}
  title={meta.title}
  twitter={{
    cardType: "summary_large_image",
    title: meta.title,
    description: meta.description,
    image: meta.image.url,
    imageAlt: meta.image.alt,
  }}
/>
<div class="content-wrapper main-content" data-testid="error">
  <BackLink />
  <h1 data-testid="error-heading">{code}: {message}</h1>
  <ConfusedTravolta reason="la page n'a pas été trouvée" />
</div>
