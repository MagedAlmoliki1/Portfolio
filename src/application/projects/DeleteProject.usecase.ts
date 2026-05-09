import { IProjectRepository } from "@/contracts/repositories/IProjectRepository";

export class DeleteProjectUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(id: string): Promise<boolean> {
    return this.projectRepository.delete(id);
  }
}
