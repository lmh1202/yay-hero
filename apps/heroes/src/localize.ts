import { HeroAttributes, HeroClass, HeroModel, Page } from "./types/heroes.type";

export type Data = {
  isRtl: boolean;
  restUrl: string;
  restNonce: string;
  preloadHeroes: Page<HeroModel>;
  auth: {
    canRead: boolean;
    canWrite: boolean;
  };
};

export type Settings = {
  defaultValues: {
    name: string;
    level: number;
  }
  levelUpAttributes: Record<HeroClass, HeroAttributes>;
}

export const yayHeroData = (window as any).yayHeroData as Data;
export const yayHeroSettings = (window as any).yayHeroSettings as Settings;