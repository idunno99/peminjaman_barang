const ListUsers = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="overflow-x-auto">
			<table className="table text-center rounded-none text-primary">
				<thead className="text-white bg-primary">
					<tr>
						<th>No</th>
						<th>Nama Lengkap</th>
						<th>Email</th>
						<th>Username</th>
						<th>Role</th>
						<th>Aksi</th>
					</tr>
				</thead>
				<tbody>{children}</tbody>
			</table>
		</div>
	);
};

export default ListUsers;
