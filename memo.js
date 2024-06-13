// 회원가입 api 저장
const { email, name, password, passwordConfirm } = req.body;
const isExistUser = await prisma.users.findFirst({
  where: { email },
});
//필수 정보가 누락되었을 때 어떤 정보가 누락되었는지 표기
if (!email || !name || !password || !passwordConfirm) {
  const missingField = [];
  if (!email) missingField.push("이메일");
  if (!name) missingField.push("이름");
  if (!password) missingField.push("비밀번호");
  if (!passwordConfirm) missingField.push("비밀번호 확인");
  return res
    .status(400)
    .json(
      `${missingField.join(`, `)}가 누락되었습니다. 다시 한 번 확인해주세요.`
    );
}
if (isExistUser) {
  return res.status(400).json(`해당 이메일로 가입된 사용자가 있습니다.`);
}
if (password.length < 6) {
  return res.status(400).json(`비밀번호는 6자 이상이어야 합니다.`);
}
if (password !== passwordConfirm) {
  return res
    .status(400)
    .json(`비밀번호가 일치하지 않습니다. 다시 한 번 확인해주세요.`);
}

//비밀번호 암호화
const salt = parseInt(process.env.HASH, 10);
const hashedPassword = await bcrypt.hash(password, salt);
//유저 정보 생성 시 비밀번호는 암호화
const user = await prisma.users.create({
  data: {
    email,
    password: hashedPassword,
    name,
  },
});
const { password: _, ...resUser } = user;

return res.status(201).json({ message: "회원가입 성공!", user: resUser });
