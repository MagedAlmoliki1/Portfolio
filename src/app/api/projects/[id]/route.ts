import { NextResponse } from "next/server";
import { MongoProjectRepository } from "@/infrastructure/repositories/MongoProjectRepository";
import { UpdateProjectUseCase } from "@/application/projects/UpdateProject.usecase";
import { DeleteProjectUseCase } from "@/application/projects/DeleteProject.usecase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const projectRepository = new MongoProjectRepository();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    // If it's a slug, we might need a different route or check here
    // For now assume it's an ID for admin or slug for public
    const project = await projectRepository.findById(id);
    if (!project) {
      // Try by slug
      const projectBySlug = await projectRepository.findBySlug(id);
      if (!projectBySlug) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
      }
      return NextResponse.json(projectBySlug);
    }
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const updateProjectUseCase = new UpdateProjectUseCase(projectRepository);
    const project = await updateProjectUseCase.execute(id, data);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update project" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const deleteProjectUseCase = new DeleteProjectUseCase(projectRepository);
    const success = await deleteProjectUseCase.execute(id);

    if (!success) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
