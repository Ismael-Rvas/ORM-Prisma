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
export async function insertarAsignatura(formData) {
    const nombre = formData.get('nombre');
    const profesor = formData.get('profesor');
    const num_horas = Number(formData.get('num_horas'));

    await prisma.asignatura.create({
        data: {
            nombre,
            profesor,
            num_horas
        }
    })

    revalidatePath('/asignaturas');

}

export async function modificarAsignatura(formData) {
    const id = Number(formData.get('id'));
    const nombre = formData.get('nombre');
    const profesor = formData.get('profesor');
    const num_horas = Number(formData.get('num_horas'));

    await prisma.asignatura.update({
        where: {
            id: id,
        },
        data: {
            nombre,
            profesor,
            num_horas
        }
    })

    revalidatePath('/asignaturas');
}

export async function eliminarAsignatura(formData) {
    const id = Number(formData.get('id'));

    await prisma.asignatura.delete({
        where: {
            id: id,
        }
    });

    revalidatePath('/asignaturas');
}
export async function insertarAlumno(formData) {
    const nombre = formData.get('nombre');
    const fecha_nacimiento = formData.get('fecha_nacimiento');
    // const foto = formData.get('foto');
    const tutor_legal = formData.get('tutor_legal');

    await prisma.alumno.create({
        data: {
            nombre,
            fecha_nacimiento,
            tutor_legal
        }
    });

    revalidatePath('/alumnos');

}

export async function modificarAlumno(formData) {
    const id = Number(formData.get('id'));
    const nombre = formData.get('nombre');
    const fecha_nacimiento = formData.get('fecha_nacimiento');
    // const foto = formData.get('foto');
    const tutor_legal = formData.get('tutor_legal');

    await prisma.alumno.update({
        where: {
            id: id,
        },
        data: {
            nombre,
            fecha_nacimiento,
            // foto,
            tutor_legal
        }
    });

    revalidatePath('/alumnos');
}

export async function eliminarAlumno(formData) {
    const id = Number(formData.get('id'));

    await prisma.alumno.delete({
        where: {
            id: id,
        }
    });

    revalidatePath('/alumnos');
}

