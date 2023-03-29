import { yayHeroSettings } from "@src/localize";
import { Hero, HeroModel, Page } from "@src/types/heroes.type";
import wpEndpoint from "./wpRest";

export interface PageOptions {
  page: number;
  size: number;
}

export function getHeroes({
  page = 1,
  size = 5,
}: PageOptions): Promise<Page<HeroModel>> {
  console.log("getHeroes");
  return wpEndpoint.get(`heroes?page=${page}&size=${size}`).json();
}

export function getHeroById(heroId: number): Promise<HeroModel> {
  return wpEndpoint.get(`heroes/${heroId}`).json();
}

export function postHero(payload: Hero): Promise<number> {
  return wpEndpoint
    .post("heroes", {
      json: payload,
    })
    .json();
}

export async function savePostSetting(url = '', data: any) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "X-WP-Nonce": yayHeroSettings.restNonce,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  })
  return await response.json();
}

export function patchHero(heroId: number, payload: Hero): Promise<any> {
  return wpEndpoint
    .patch(`heroes/${heroId}`, {
      json: payload,
    })
    .json();
}

export function levelupHero(heroId: number): Promise<any> {
  return wpEndpoint.put(`heroes/${heroId}`);
}

export function deleteHero(heroId: number): Promise<boolean> {
  return wpEndpoint.delete(`heroes/${heroId}`).json();
}
