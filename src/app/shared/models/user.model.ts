export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';  // ممكن تضيف دور المستخدم
  // أي حقول إضافية حسب بياناتك
}
