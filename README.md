# [VICA] OMS Base

Installation
============

Applications that use Symfony Flex
----------------------------------

Open a command console, enter your project directory and execute:

```console
$ composer require tmtfactory/printing-oms-bundle
```

Applications that don't use Symfony Flex
----------------------------------------

### Step 1: Download the Bundle

Open a command console, enter your project directory and execute the
following command to download the latest stable version of this bundle:

```console
$ composer require tmtfactgory/printing-oms-bundle
```

This command requires you to have Composer installed globally, as explained
in the [installation chapter](https://getcomposer.org/doc/00-intro.md)
of the Composer documentation.

### Step 2: Enable the Bundle

Then, enable the bundle by adding it to the list of registered bundles
in the `app/AppKernel.php` file of your project:

```php
<?php
// app/AppKernel.php

// ...
class AppKernel extends Kernel
{
    public function registerBundles()
    {
        $bundles = [
            // ...
            new Tmtfactory\PrintingOmsBundle\TmtfactoryPrintingOmsBundle(),
        ];

        // ...
    }

    // ...
}
```

Usage
=====

Models
------
This bundle provides two interfaces to model Orders and OrderLines. So they 
must be implemented in order to build up a functional OMS.

Repositories
------------
As seen in Models, this bundle provides two interfaces to model Order and
OrderLine repositories.

Controllers
-----------
This bundle provides two controllers:
- A controller that serves the React front
- A controller that exposes an API Rest

Front
-----
Frontend has been developed with React and uses Webpack encore in order to build
it up.

To build up or extend the front, please import or require these files in your actual front:
- ```require('../../vendor/tmtfactory/printing-oms-bundle/src/Resources/public/js/app.js');```
- ```@import '../../vendor/tmtfactory/printing-oms-bundle/src/Resources/public/scss/global';```