Adsterra Implementation for Image Converter App

Registration: ive registered into adsterra.com and implemented ads

Available Ad Unit Formats:
- Popunder
- Native Banner
- Banner 
- Smartlink
- Social Bar

Available Banner Sizes:
- Banner 468x60
- Banner 300x250
- Banner 160x300
- Banner 160x600
- Banner 320x50
- Banner 728x90

Implementation Details in Image Converter App:

1. Top Banner (728x90):
<script type="text/javascript">
	atOptions = {
		'key' : '352e262ab4715f1de7644af0a96eb384',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/352e262ab4715f1de7644af0a96eb384/invoke.js"></script>

2. Conversion Options Banner (300x250):
<script type="text/javascript">
	atOptions = {
		'key' : 'f6333d42bdf5a726a8c47ba0ea48ca68',
		'format' : 'iframe',
		'height' : 250,
		'width' : 300,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f6333d42bdf5a726a8c47ba0ea48ca68/invoke.js"></script>   

3. Popunder:
<script type='text/javascript' src='//pl27941837.effectivegatecpm.com/61/25/2b/61252b0d7a0503d7cc99a16886179cc2.js'></script>

4. Smartlink:
https://www.effectivegatecpm.com/rnvbg7y1n?key=b8910e018443b8a9f34b07b66d472f12

5. Social Bar:
<script type='text/javascript' src='//pl27941766.effectivegatecpm.com/f3/6c/4d/f36c4dceaf4e0747c702fb57bcd6e74b.js'></script>

6. Native Banner:
<script async="async" data-cfasync="false" src="//pl27941844.effectivegatecpm.com/c3ea8053002a10709d9cfaf965cf9f2a/invoke.js"></script>
<div id="container-c3ea8053002a10709d9cfaf965cf9f2a"></div>

Ad Placements in App.jsx:
- Top Banner: After header, before main content
- Conversion Options Banner: In the conversion options section
- Popunder: Invisible component that triggers after delay or exit intent
- Smartlink: In the image formats guide section
- Native Banner: Below the footer ad
- Social Bar: At the bottom of the page before the footer