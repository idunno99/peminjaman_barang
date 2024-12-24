import ListUsers from "../components/pengguna/ListUsers";
import { ButtonAdd, ButtonEdit } from "../components/Button";
import { getUsers, getUsersPage } from "@/lib/_data/users";
import DeleteModal from "../components/DeleteModal";
import Search from "@/components/Search";
import Pagenation from "@/components/Pagenation";
import { ErrorAlert } from "@/components/Alert";

const UserPage = async ({
	searchParams,
}: {
	searchParams?: {
		query?: string;
		page?: string;
	};
}) => {
	const query = searchParams?.query || "";
	const currentPage = Number(searchParams?.page) || 1;

	const users = await getUsers(query, currentPage);

	const totalPages = await getUsersPage(query);

	return (
		<div className="flex flex-col gap-5">
			<div className="flex flex-row flex-wrap justify-between gap-2">
				<Search />
				<ButtonAdd label="pengguna">Tambah Pengguna</ButtonAdd>
			</div>
			{totalPages === 0 ? (
				<div className="w-1/3">
					<ErrorAlert>Pengguna Tidak Ditemukan</ErrorAlert>
				</div>
			) : null}
			<ListUsers>
				{users.map((user, index) => (
					<tr key={index} className="hover">
						<td>{index + 1}</td>
						<td>{user.name}</td>
						<td>{user.email}</td>
						<td>{user.username}</td>
						<td>{user.role}</td>
						<td className="flex flex-wrap items-center justify-center gap-2">
							<ButtonEdit id={user.id} label="pengguna" />
							<DeleteModal id={user.id} label="user">
								Akun ini akan dihapus?
							</DeleteModal>
						</td>
					</tr>
				))}
			</ListUsers>
			<div className="place-self-center">
				<Pagenation totalPages={totalPages} />
			</div>
		</div>
	);
};

export default UserPage;
