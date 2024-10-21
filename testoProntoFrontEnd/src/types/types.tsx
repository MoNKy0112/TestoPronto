export interface createTemplate {
  title: string,
  text: string,
}
export interface template extends createTemplate {
  _id: string,
}

export interface createCategory {
  name: string,
  templates: template[],
}

export interface category extends createCategory {
  _id: string,
}

export interface user {
  username: string,
  picture?: string | undefined,
  email: string,
}