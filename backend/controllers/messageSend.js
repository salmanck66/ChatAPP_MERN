export const sendMessage = async (req, res) => {
try {
    const {message} = req.body
    const {id} = req.params
    const {senderId} = req.userId 
      console.log(req.params.id);
      res.send("Message received");
} catch (error) {
  console.log(error.message,"error in sendMessage");
}
  };
  