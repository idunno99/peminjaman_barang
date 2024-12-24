import { z } from "zod";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const PeminjamanPerangkatSchema = z
	.object({
		tglpinjam: z
			.string()
			.refine((date) => !isNaN(new Date(date).getTime()), {
				message: "Tanggal peminjaman harus diisi",
			})
			.refine(
				(date) => {
					if (date === "") return true;
					const selectedDate = new Date(date);
					return selectedDate >= today;
				},
				{
					message: "Tanggal peminjaman harus hari ini atau setelah hari ini",
				}
			)
			.transform((date) => new Date(date)),
		tglselesai: z
			.string()
			.refine((date) => !isNaN(new Date(date).getTime()), {
				message: "Tanggal peminjaman harus diisi",
			})
			.transform((date) => new Date(date)),
		jumlah: z.string().min(1, "Jumlah perangkat harus diisi"),
		stok: z.string(),
		keterangan: z.string().min(1, "Keterangan harus diisi"),
	})
	.superRefine((data, ctx) => {
		const tanggalPinjam = new Date(data.tglpinjam);
		const tanggalKembali = new Date(data.tglselesai);
		if (tanggalKembali < tanggalPinjam) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ["tglselesai"],
				message: "Tanggal selesai harus setelah tanggal pinjam",
			});
		}

		if (parseInt(data.jumlah) > parseInt(data.stok)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ["jumlah"],
				message: "Perangkat yang tersedia tidak cukup",
			});
		}
	});

export const PeminjamanRuanganSchema = z
	.object({
		tglpinjam: z
			.string()
			.refine((date) => !isNaN(new Date(date).getTime()), {
				message: "Tanggal peminjaman harus diisi",
			})
			.refine(
				(date) => {
					if (date === "") return true;
					const selectedDate = new Date(date);
					return selectedDate >= today;
				},
				{
					message: "Tanggal peminjaman harus hari ini atau setelah hari ini",
				}
			)
			.transform((date) => new Date(date)),
		tglselesai: z
			.string()
			.refine((date) => !isNaN(new Date(date).getTime()), {
				message: "Tanggal peminjaman harus diisi",
			})
			.transform((date) => new Date(date)),
		keterangan: z.string().min(1, "Keterangan harus diisi"),
	})
	.superRefine((data, ctx) => {
		const tanggalPinjam = new Date(data.tglpinjam);
		const tanggalKembali = new Date(data.tglselesai);
		if (tanggalKembali < tanggalPinjam) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ["tglselesai"],
				message: "Tanggal selesai harus setelah tanggal pinjam",
			});
		}
	});
