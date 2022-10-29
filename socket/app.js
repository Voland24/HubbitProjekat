//kod tebe na frontendu je ovo ws://localhost:8900
//pretpostavka da ces da budes na 3000 port na frontendu

const { findConfigFile } = require("typescript");

const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:4200",
  },
});

let users = [];

const addUser = (username, socketId) => {
  var found;
  /*if (users.length == 0) {
    users.push({ username: username, socketId: socketId });
  } else {
    users = users.map((m) => {
      if (m.username == username) {
        m.socketId = socketId;
      }
    });
  }*/

  !users.some((user) => user.username === username) &&
    users.push({ username, socketId });

  var userIndex = users.findIndex((m) => m.username === username);
  if (userIndex != -1) {
    users.splice(userIndex, 1);

    users.push({ username, socketId });
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId != socketId);
};

const getUser = (username) => {
  return users.find((user) => user.username === username);
};

io.on("connection", (socket) => {
  console.log("New user has connected to Socket.io server...");

  //Sta ovo znaci? Emit je fja koja radi broadcast svim klijentima
  //prikacenim na Socket io server,
  //prvi parametar je ime eventa koji salje server klijentima
  //tako ce klijent da zna koji event mu je stigao i da ih razlikuje
  //drugi parametar je samo poruka tj. data koji se prenosi tokom eventa

  //io.emit("welcome", "Welcome to hubbit");

  //da bih ja mogao da kazem io.to(socketID), moram da znam koji je socket id
  //tj. moram da vezem socket iD za klijenta
  //to dolazi sa frontend
  //klijent salje serveru event ("addUser", username) recimo

  //USER CONNECTS TO SERVER
  socket.on("addUser", (username) => {
    addUser(username, socket.id);
    console.log(users);
    /*var found = users.find((m) => m.username === username);
    if (!found) {
      users.push({ username: username, socketId: socketId });
    }*/
  }); //isto API call u conversation rutu, dohvatis sve conversation gde se pominje ovaj korisnik

  socket.on("giveUsers", () => {
    io.emit("getUsers", users);
  });
  //ti ovo na frontu uhvatis kao getUsersEvent i tad okines API call
  // dohvatis sve connected userse iz mongo liste za date korisnike

  //users je lista korisnika koji su trenutno aktivni tj. na app su
  //ti na frontu u local storage imas username tren korisnika
  //ja ti vratim listu ljudi koja je trenutno aktivna
  //ti ces da uzmes one ljude sa kojim trenutni korisnik komunicira
  //i da dohvatis one koji se iz te liste nalaze u listi korisnika
  //koji su trenutno aktivni

  //kad se izlsitaju svi korisnici sa kojim razgovara, na klik na neki od njih
  //trebalo bi da ode jedan API call ka conversation ruti da se dohvati konkretran razgovor
  //izmedju dva korisnika

  //SEND AND RECEIVE MESSAGE
  //saljes mi event sendMessage koji ima senderUsername, receiverUsername i tekst poruke
  //ja hvatam taj event, nalazim socket receivera i samo njemu saljem event getMessage
  //sa parametrima ko salje i tekstom poruke
  //ti ces da hvatas getMessage event kad stigne i da prikazes poruku koja je stigla
  //za datog korisnika
  //takodje, da uhvatis ovaj getMessage event, pravis novu poruku tj. objekat i
  //salje se API CALL mongu da napravi novu poruku u bazi
  //proveri se da li trenutni convo na frontendu sadrzi ovog ko saljes poruku, da se ne prikaze
  //u pogresan chat
  socket.on("sendMessage", ({ senderUsername, receiverUsername, text }) => {
    const user = getUser(receiverUsername);

    if (user) {
      console.log(`Receiver : ${user.socketId}`);
      console.log(`This socket: ${socket.id}`);
      io.to(user.socketId).emit("getMessage", { senderUsername, text });
    }
  });

  socket.on("newConvoAdded", (userToNotify) => {
    io.emit("notify", userToNotify.toString());
  });

  //USER DISCONNECTS TO SERVER
  socket.on("disconnectUser", () => {
    removeUser(socket.id);
    console.log(users);
  });
});
