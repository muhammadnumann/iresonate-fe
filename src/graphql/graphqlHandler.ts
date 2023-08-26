
export const CallMutation = (mutationFunction: any, data: any,resetForm?: Function) => {
   const res = mutationFunction(data)
   res.then(() => {
      console.log("success")
      resetForm && resetForm()
   }).catch((err: any) => {
      console.log("err", err)
   })
}
