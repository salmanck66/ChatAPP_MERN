export const getUserSideBar = async (req, res) => {
    try {
        const availableuser = req.user._id
    } catch (error) {
        console.log("Error in user",error.message)
        res.status(500).json({error})
    }
};
