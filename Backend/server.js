const express = require("express");
const MatchRegister = require("./models/MatchRegister");
const PlayerRegister = require("./models/PlayerRegister");
const SignUpDetails = require("./models/SignUp");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const validator = require("validator");
require("dotenv").config();

app.use(cors());
app.options("*", cors());
app.use(express.json());

const signUpDbConfig = require("./signUpDbConfig");

app.post("/postMatchRegisterDetails", async (req, res) => {
  mongoose.connect(signUpDbConfig.connectionString, {
    useNewUrlParser: signUpDbConfig.useNewUrlParser,
    useUnifiedTopology: signUpDbConfig.useUnifiedTopology,
    dbName: signUpDbConfig.Ipldb,
  });

  const { place, date, team1, team2 } = req.body;

  const MatchRegisterDetails = new MatchRegister({
    place,
    date,
    team1,
    team2,
  });

  try {
    const createdMatchRegister = await MatchRegisterDetails.save();
    res.status(200).json(createdMatchRegister);
  } catch (err) {
    res.status(500).json({
      error: err.message,
      success: false,
    });
  }
});

app.get("/getMatchRegisterDetails", async (req, res) => {
  try {
    const matchRegisters = await MatchRegister.find();
    res.status(200).json(matchRegisters);
  } catch (err) {
    res.status(500).json({
      error: err.message,
      success: false,
    });
  }
});

// Update match registration details by ID
app.put("/updateMatchRegisterDetails/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { place, date, team1, team2 } = req.body;

    const updatedMatchRegister = await MatchRegister.findByIdAndUpdate(
      id,
      {
        place,
        date,
        team1,
        team2,
      },
      { new: true }
    );

    res.status(200).json(updatedMatchRegister);
  } catch (err) {
    res.status(500).json({
      error: err.message,
      success: false,
    });
  }
});

// Delete match registration details by ID
app.delete("/deleteMatchRegisterDetails/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await MatchRegister.findByIdAndDelete(id);

    res.status(200).json({
      message: "Match registration details deleted successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      success: false,
    });
  }
});

// Create a new player registration details
app.post("/playerRegisterDetails", async (req, res) => {
  try {
    const { teamName, playerName, playerRole, playerCountry } = req.body;

    const playerRegisterDetails = new PlayerRegister({
      teamName,
      playerName,
      playerRole,
      playerCountry,
    });

    const createdPlayerRegister = await playerRegisterDetails.save();

    res.status(201).json(createdPlayerRegister);
  } catch (err) {
    res.status(500).json({
      error: err.message,
      success: false,
    });
  }
});

// Retrieve all player registration details
app.get("/playerRegisterDetails", async (req, res) => {
  try {
    const playerRegisterDetails = await PlayerRegister.find();

    res.status(200).json(playerRegisterDetails);
  } catch (err) {
    res.status(500).json({
      error: err.message,
      success: false,
    });
  }
});

// Retrieve player registration details by ID
app.get("/playerRegisterDetails/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const playerRegisterDetails = await PlayerRegister.findById(id);

    if (!playerRegisterDetails) {
      return res.status(404).json({
        error: "Player registration details not found",
        success: false,
      });
    }

    res.status(200).json(playerRegisterDetails);
  } catch (err) {
    res.status(500).json({
      error: err.message,
      success: false,
    });
  }
});

// Update player registration details by ID
app.put("/playerRegisterDetails/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { teamname, playerName, playerRole, playerCountry } = req.body;

    const updatedPlayerRegister = await PlayerRegister.findByIdAndUpdate(
      id,
      {
        teamname,
        playerName,
        playerRole,
        playerCountry,
      },
      { new: true }
    );

    res.status(200).json(updatedPlayerRegister);
  } catch (err) {
    res.status(500).json({
      error: err.message,
      success: false,
    });
  }
});

// Delete player registration details by ID
app.delete("/playerRegisterDetails/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await PlayerRegister.findByIdAndDelete(id);

    res.status(200).json({
      message: "Player registration details deleted successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      success: false,
    });
  }
});

app.post("/signup", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    const newSignup = new SignUpDetails({
      name,
      email,
      password,
      confirmPassword,
    });

    const createdSignup = await newSignup.save();

    res.status(201).json({
      success: true,
      data: createdSignup,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.get("/signup", async (req, res) => {
  try {
    const signups = await SignUpDetails.find();

    res.status(200).json({
      success: true,
      data: signups,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.get("/signup/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const signup = await SignUpDetails.findById(id);

    if (!signup) {
      return res.status(404).json({
        success: false,
        error: "Signup not found",
      });
    }

    res.status(200).json({
      success: true,
      data: signup,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.put("/signup/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const signup = await SignUpDetails.findById(id);

    if (!signup) {
      return res.status(404).json({
        success: false,
        error: "Signup not found",
      });
    }

    const { name, email, password, confirmPassword } = req.body;

    if (name) {
      signup.name = name;
    }

    if (email) {
      signup.email = email;
    }

    if (password) {
      signup.password = password;
    }

    if (confirmPassword) {
      signup.confirmPassword = confirmPassword;
    }

    const updatedSignup = await signup.save();

    res.status(200).json({
      success: true,
      data: updatedSignup,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.delete("/signup/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSignup = await SignUpDetails.findByIdAndDelete(id);

    if (!deletedSignup) {
      return res.status(404).json({
        success: false,
        error: "Signup not found",
      });
    }

    res.status(200).json({
      success: true,
      data: deletedSignup,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://shreyas:shreyas@ipl.wvrhpsl.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "ipl",
    }
  )
  .then(() => {
    console.log("Database connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log(`Server is Running on http://localhost:3000 port`);
});
