


export default function stop () {
    process.on('SIGINT', function() {
        console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
        // some other closing procedures go here
        process.exit(1);
      });
}
