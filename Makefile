build:
	@pnpm exec rbxtsc build -p src --usePolling --verbose --optimizedLoops

format:
	@pnpm exec prettier -w . --config .prettierrc.json --ignore-path .prettierignore --cache --cache-strategy content

format-out:
	@darklua process out out -c .darklua.json -v
	@stylua out -f stylua.toml --respect-ignores -v --verify