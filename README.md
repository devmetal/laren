<!-- TITLE/ -->

<h1>laren</h1>

<!-- /TITLE -->


<!-- BADGES/ -->

<span class="badge-travisci"><a href="http://travis-ci.org/devmetal/laren" title="Check this project's build status on TravisCI"><img src="https://img.shields.io/travis/devmetal/laren/master.svg" alt="Travis CI Build Status" /></a></span>

<!-- /BADGES -->


<!-- DESCRIPTION/ -->

Command line tool for renaming files with custom function expression

<!-- /DESCRIPTION -->


<!-- INSTALL/ -->

<h2>Install</h2>

<a href="https://npmjs.com" title="npm is a package manager for javascript"><h3>NPM</h3></a><ul>
<li>Install: <code>npm install --global laren</code></li>
<li>Executable: <code>laren</code></li></ul>

<!-- /INSTALL -->


## Usage

```bash
laren <pattern> [function] <options>
```

<h2>[pattern]</h2>
This is a glob pattern.

<h2>[function]</h2>
The function parameter take 2 argument, filename and the index. You can write any function that you want.
In the current version, the function is an optional argument. If any function provided by args, that will be used in files.
If you don't give the function you have to type in terminal with an :exit (see example below) or you have to use unix pipe to
send your function to stdin.

<h2>Options</h2>

<h3>-t --test</h3>
Run script in test mode. No modify the files but print out the matches and names. If you run the command without this switch,
the files will be renamed.

<h1>Usage example</h1>

```bash
laren -t ./**/* "(f, i) => 'file' + i"
./filea ==> file0
./fileb ==> file1
./filec ==> file2
Tests done!
```

```bash
laren -t ./**/*
(f,i) => 'file' + i;
:exit
./filea ==> file0
./fileb ==> file1
./filec ==> file2
Tests done!
```

```bash
echo "(f,i) => 'file' + i;" | laren -t ./**/*
./filea ==> file0
./fileb ==> file1
./filec ==> file2
Tests done!
```

<!-- HISTORY/ -->

<h2>History</h2>

<a href="https://github.com/devmetal/laren/releases">Discover the release history by heading on over to the releases page.</a>

<!-- /HISTORY -->


<!-- BACKERS/ -->

<h2>Backers</h2>

<h3>Maintainers</h3>

These amazing people are maintaining this project:

<ul><li><a href="https://github.com/devmetal">Metál Ádám</a> — <a href="https://github.com/devmetal/laren/commits?author=devmetal" title="View the GitHub contributions of Metál Ádám on repository devmetal/laren">view contributions</a></li></ul>

<h3>Sponsors</h3>

No sponsors yet! Will you be the first?



<h3>Contributors</h3>

These amazing people have contributed code to this project:

<ul><li><a href="https://github.com/devmetal">Metál Ádám</a> — <a href="https://github.com/devmetal/laren/commits?author=devmetal" title="View the GitHub contributions of Metál Ádám on repository devmetal/laren">view contributions</a></li>
<li><a href="https://github.com/lmagyar89">László Magyar</a> — <a href="https://github.com/devmetal/laren/commits?author=lmagyar89" title="View the GitHub contributions of László Magyar on repository devmetal/laren">view contributions</a></li></ul>



<!-- /BACKERS -->


<!-- LICENSE/ -->

<h2>License</h2>

Unless stated otherwise all works are:

<ul><li>Copyright &copy; <a href="https://github.com/devmetal">Metál Ádám</a></li></ul>

and licensed under:

<ul><li><a href="http://spdx.org/licenses/MIT.html">MIT License</a></li></ul>

<!-- /LICENSE -->
