import { z } from "zod";

export const PerangkatSchema = z.object({
	title: z.string().min(1, "Nama perangkat harus diisi"),
	jumlah: z.string().min(1, "Jumlah perangkat harus diisi"),
	deskripsi: z.string(),
	image: z
		.instanceof(File)
		.refine((file) => file.size > 0, { message: "Gambar harus diisi" })
		.refine((file) => file.size === 0 || file.type.startsWith("image/"), {
			message: "File harus berupa gambar",
		})
		.refine((file) => file.size < 5000000, {
			message: "File harus kurang dari 5 MB",
		}),
});

export const UpdateSchema = z.object({
	title: z.string().min(1, "Nama perangkat harus diisi"),
	jumlah: z.string().min(1, "Jumlah perangkat harus diisi"),
	deskripsi: z.string(),
	image: z
		.instanceof(File)
		.refine((file) => file.size === 0 || file.type.startsWith("image/"), {
			message: "File harus berupa gambar",
		})
		.refine((file) => file.size < 5000000, {
			message: "File harus kurang dari 5 MB",
		})
		.optional(),
});