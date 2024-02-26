interface Profile {
  skill: string;
  age: number;
}
type Who = "a" | "b" | "c";
type Heroes = Record<Who, Profile>;

// 만들어지는 타입
// type Heroes = {
//   a: Profile;
//   b: Profile;
//   c: Profile;
// }

var members: Heroes = {
  a: { skill: "", age: 100 },
  b: { skill: "", age: 100 },
  c: { skill: "", age: 100 },
};
