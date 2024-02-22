interface Student {
  id: number;
  nickName: string;
  speak(): void;
}
function showItem(item: Student): Student {
  console.log(item);
  return item;
}

const gogo = () => {};
const who: Student = { id: 1, nickName: "hong", speak: gogo };

const st: Student = showItem(who);
