interface PermissionType {
  name: string
  description: string
  path: string
  method: string
  created_at?: Date
  updated_at?: Date
}
export class Permission {
  name: string
  description: string
  path: string
  method: string
  created_at?: Date
  updated_at?: Date
  constructor(permission: PermissionType) {
    const date = new Date()
    this.name = permission.name
    this.description = permission.description
    this.path = permission.path
    this.method = permission.method
    this.created_at = permission.created_at || date
    this.updated_at = permission.updated_at || date
  }
}
