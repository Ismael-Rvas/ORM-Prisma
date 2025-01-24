'use server';
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();


export async function insertarGrupo(formData) {
    const nombre = formData.get('nombre');
    const tutor = formData.get('tutor');
    const aula = formData.get('aula');

    await prisma.grupo.create({
        data: {
            nombre,
            tutor,
            aula
        }
    })

    revalidatePath('/grupos');

}

export async function modificarGrupo(formData) {
    const id = Number(formData.get('id'));
    const nombre = formData.get('nombre');
    const tutor = formData.get('tutor');
    const aula = formData.get('aula');

    await prisma.grupo.update({
        where: {
            id: id,
        },
        data: {
            nombre,
            tutor,
            aula
        }
    })

    revalidatePath('/grupos');
}

export async function eliminarGrupo(formData) {
    const id = Number(formData.get('id'));

    await prisma.grupo.delete({
        where: {
            id: id,
        }
    });


    revalidatePath('/grupos');
}

