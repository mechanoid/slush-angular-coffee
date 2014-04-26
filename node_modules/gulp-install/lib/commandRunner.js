var which = require('which'),
    childProcess = require('child_process');

exports.run = function run (command, cb, basepath) {
  which(command.cmd, function(err, cmdpath){
    if (err) {
      cb(new Error('Can\'t install.'));
      return;
    }
    var cmd = childProcess.spawn(cmdpath, command.args, {stdio: 'inherit', cwd: basepath || process.cwd()});
    cmd.on('close', function () {
      cb();
    });
  });
};
