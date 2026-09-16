import { getHeroSection } from '@/actions/hero';
import { HeroManager } from './hero-manager';

export const revalidate = 0; // Disable static caching for admin route

export default async function AdminHeroPage() {
  const heroData = await getHeroSection();

  return <HeroManager initialHero={heroData} />;
}
