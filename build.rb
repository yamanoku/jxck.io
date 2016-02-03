#!/usr/bin/env ruby

entries = `find ./blog.jxck.io/entries -name *.md`.split("\n").map{|file|
  `./mark.js #{file}`
  head = `head -n 1 #{file}`

  title = head.match(/\# \[.*\] (.*)/)[1]

  tags = head
    .scan(/\[(.+?)\]/)
    .map{|s| s.pop }
    .map{|tag| "<a>#{tag}</a>" }
    .join

  tagspan = "<span class=tags>#{tags}</span>"

  splitted = file.split("/")
  name = splitted.pop.gsub(".md", ".html")
  date = splitted.pop
  "<li><time datetime=#{date}>#{date}</time><a href=entries/#{date}/#{name}>#{title}</a>#{tagspan}"
}

puts <<-EOS
<!DOCTYPE html>
<meta charset=utf-8>
<meta name=viewport content="width=device-width,initial-scale=1">

<title>blog.jxck.io</title>
<link rel=stylesheet type=text/css href=assets/style.css>

<header>
  <a class=logo href=/>blog.jxck.io</a>
</header>

<section class=archive>
  <h1>Archive</h1>
  <h2>2016</h2>
  <ul>
    #{entries.join("\n    ")}
  </ul>
</section>

<hr>

<footer>
  <address class=copyright>Copyright &copy; 2016 <a href=/>Jxck</a>. All Rights Reserved.</address>
</footer>
EOS
