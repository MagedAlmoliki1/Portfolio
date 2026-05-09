import { IProjectRepository } from "@/contracts/repositories/IProjectRepository";
import { ProjectEntity } from "@/domain/entities/Project.entity";

export class UpdateProjectUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(id: string, data: Partial<ProjectEntity>): Promise<ProjectEntity | null> {
    return this.projectRepository.update(id, data);
  }
}
