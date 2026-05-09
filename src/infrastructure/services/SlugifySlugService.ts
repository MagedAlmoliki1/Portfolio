import { ISlugService } from "@/contracts/services/ISlugService";

export class SlugifySlugService implements ISlugService {
  async generate(title: string): Promise<string> {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 100);
  }
}
