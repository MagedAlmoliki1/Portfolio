import { NextResponse } from "next/server";
import { MongoProjectRepository } from "@/infrastructure/repositories/MongoProjectRepository";
import { GetAllProjectsUseCase } from "@/application/projects/GetAllProjects.usecase";
import { CreateProjectUseCase } from "@/application/projects/CreateProject.usecase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SlugifySlugService } from "@/infrastructure/services/SlugifySlugService";
import { MockStorageService } from "@/infrastructure/services/MockStorageService";

const projectRepository = new MongoProjectRepository();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured") === "true";

    // We can extend the use case to handle filters, but for now we use the repository directly if needed or just get all
    // To stay clean, let's use the repository's findPublished if it's a public request
    const projects = await projectRepository.findPublished({
      category: category || undefined,
      featured: featured || undefined,
    });

    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const storageService = new MockStorageService();
    const slugService = new SlugifySlugService();
    const createProjectUseCase = new CreateProjectUseCase(projectRepository, storageService, slugService);
    const project = await createProjectUseCase.execute(data);

    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create project" },
      { status: 400 }
    );
  }
}
