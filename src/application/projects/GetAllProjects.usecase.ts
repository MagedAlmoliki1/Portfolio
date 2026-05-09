import { IProjectRepository } from "@/contracts/repositories/IProjectRepository";
import { ProjectEntity } from "@/domain/entities/Project.entity";

export class GetAllProjectsUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(): Promise<ProjectEntity[]> {
    const result = await this.projectRepository.findAll();
    return result.data;
  }
}
