'use client'

import { IUser } from "@/app/types/backend";
import { Table } from "antd";
import { ColumnType } from "antd/es/table";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

interface IProps {
  users: IUser[] | [],
  limit: number,
  page: number,
  total: number
}

const UserTable = (props: IProps) => {
  const { users, limit, page, total } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();
  const columns: ColumnType<IUser>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ];

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    if(pagination && pagination.current) {
      const params = new URLSearchParams(searchParams);
      params.set('page', pagination.current);
      replace(`${pathname}?${params.toString()}`);
    }
  }
  return (
    <div>
      <Table
        bordered
        dataSource={users}
        columns={columns}
        rowKey="id"
        onChange={onChange}
        pagination={
          {
            current: page,
            pageSize: limit,
            total: total,
            showTotal: (total, range) => {
              return (<div>{range[0]}-{range[1]} trên {total} rows</div>)
            }
          }
        }
      />
    </div>
  );
}

export default UserTable;