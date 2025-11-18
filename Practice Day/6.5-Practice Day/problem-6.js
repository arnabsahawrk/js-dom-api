const friends = ['Arnab', 'Joy', 'Robin', 'Yeamin', 'Riya'];

let ans = friends[0];
for (let i = 0; i < friends.length; i++) {
  if (ans.length < friends[i].length) ans = friends[i];
}

console.log(ans);
