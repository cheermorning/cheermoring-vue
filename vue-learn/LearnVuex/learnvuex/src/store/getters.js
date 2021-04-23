export default {
  //筛选年龄大于20的学生,和长度
  gt20Stu(state){
    return state.students.filter(s => s.age > 20)
  },
  gt20StuLen(state, getters){
    return getters.gt20Stu.length;
  },
  //筛选年龄大于输入年龄的学生集
  gtAgeStu(state){
    return age => state.students.filter(s => s.age > age)
  }
}