<?php
/**
 * :tmtfactory) © 2019
 * Carles Capell <carles.capell@tmtfactory.com>
 */

namespace Tmtfactory\PrintingOmsBundle;


use Symfony\Component\HttpKernel\Bundle\Bundle;
use Tmtfactory\PrintingOmsBundle\DependencyInjection\TmtfactoryPrintingOmsExtension;

class TmtfactoryPrintingOmsBundle extends Bundle
{
    /**
     * Overriden to allow for the custom extension alias
     * @return null|\Symfony\Component\DependencyInjection\Extension\ExtensionInterface|TmtfactoryPrintingOmsExtension
     */
    public function getContainerExtension()
    {
        if (null === $this->extension) {
            $this->extension = new TmtfactoryPrintingOmsExtension();
        }

        return $this->extension;
    }

}