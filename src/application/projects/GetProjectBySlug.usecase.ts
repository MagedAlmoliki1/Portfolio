import { IProjectRepository } from "@/contracts/repositories/IProjectRepository";
import { ProjectEntity } from "@/domain/entities/Project.entity";

export class GetProjectBySlugUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(slug: string): Promise<ProjectEntity | null> {
    return this.projectRepository.findBySlug(slug);
  }
}
