const rolMethod = {};
const Rol = require("../models/rol.model");
const acc = require("../middlewares/accessControl");

async function getRol(_id) {
    try {
        return Rol.findById(_id);
    } catch (error) {
        return false;
    }
}

rolMethod.getRols = async (req, res) => {
    const permission = acc.can(req.user.rol.name).readAny("rol").granted;
    if (permission) {
        try {
            const rols = await Rol.find();
            if (rols) {
                return res.status(200).json({
                    status: true,
                    rols,
                    message: "Rols find",
                });
            } else {
                return res.status(400).json({
                    status: false,
                    message: "No rols find",
                });
            }
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: "No rols find",
            });
        }
    } else {
        return res.status(400).json({
            status: false,
            message: "You can't do this action.",
        });
    }
};

rolMethod.getRol = async (req, res) => {
    const permission = acc.can(req.user.rol.name).readAny("rol").granted;
    if (permission) {
        try {
            const rolID = req.params.id;
            if (rolID) {
                const rol = await getRol(rolID);
                if (rol) {
                    return res.status(200).json({
                        status: true,
                        rol,
                        message: "Rol find",
                    });
                } else {
                    return res.status(400).json({
                        status: false,
                        message: "No rol find",
                    });
                }
            } else {
                return res.status(400).json({
                    status: false,
                    message: "The ID is required.",
                });
            }
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: "No rols find",
            });
        }
    } else {
        return res.status(400).json({
            status: false,
            message: "You can't do this action.",
        });
    }
};

rolMethod.createRol = async (req, res) => {
    const permission = acc.can(req.user.rol.name).createAny("rol").granted;
    if (permission) {
        const { name } = req.body;
        if (name) {
            const verify = Object.values(rols).some((rol) => {
                return rol === name;
            });

            if (verify) {
                const rol = new Rol({
                    name,
                });
                if (await rol.save()) {
                    return res.status(201).json({
                        status: true,
                        message: "Rol created successfully",
                    });
                } else {
                    return res.status(400).json({
                        status: false,
                        message: "There was a problem, please try again.",
                    });
                }
            } else {
                return res.status(400).json({
                    status: false,
                    message: "The name is not allow.",
                });
            }
        } else {
            return res.status(400).json({
                status: false,
                message: "Fill all requered fields.",
            });
        }
    } else {
        return res.status(400).json({
            status: false,
            message: "You can't do this action.",
        });
    }
};

rolMethod.updateRol = async (req, res) => {
    const permission = acc.can(req.user.rol.name).updateAny("rol").granted;
    if (permission) {
        const { rolID, name } = req.body;
        if (rolID && name) {
            try {
                const rol = await getRol(rolID);
                if (rol) {
                    const verify = Object.values(rols).some((rol) => {
                        return rol === name;
                    });
                    if (!verify) {
                        return res.status(400).json({
                            status: false,
                            message: "This name is not allowed.",
                        });
                    }

                    if (
                        await rol.updateOne({
                            name,
                        })
                    ) {
                        return res.status(200).json({
                            status: true,
                            message: "The rol was updated successfully.",
                        });
                    } else {
                        return res.status(400).json({
                            status: false,
                            message: "There was a problem, please try again.",
                        });
                    }
                } else {
                    return res.status(400).json({
                        status: false,
                        message: "The rolID, was not found.",
                    });
                }
            } catch (error) {
                return res.status(400).json({
                    status: false,
                    message: "There was a problem, please try again.",
                });
            }
        } else {
            return res.status(400).json({
                status: false,
                message: "Fill all requered fields",
            });
        }
    } else {
        return res.status(400).json({
            status: false,
            message: "You can't do this action.",
        });
    }
};

rolMethod.deleteRol = async (req, res) => {
    const permission = acc.can(req.user.rol.name).deleteAny("rol").granted;
    if (permission) {
        const { rolID } = req.body;
        if (rolID) {
            try {
                const rol = await getRol(rolID);
                if (rol) {
                    if (await rol.deleteOne()) {
                        return res.status(200).json({
                            status: true,
                            message: "The rol was eliminated successfully",
                        });
                    } else {
                        return res.status(400).json({
                            status: false,
                            message: "There was a problem, please try again.",
                        });
                    }
                } else {
                    return res.status(400).json({
                        status: false,
                        message: "The rolID, was not found.",
                    });
                }
            } catch (error) {
                return res.status(400).json({
                    status: false,
                    message: "There was a problem, please try again.",
                });
            }
        } else {
            return res.status(400).json({
                status: false,
                message: "The ID is required.",
            });
        }
    } else {
        return res.status(400).json({
            status: false,
            message: "You can't do this action.",
        });
    }
};

module.exports = rolMethod;
