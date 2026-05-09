// src/contracts/services/ISlugService.ts
export interface ISlugService {
  generate(title: string): Promise<string>
}
