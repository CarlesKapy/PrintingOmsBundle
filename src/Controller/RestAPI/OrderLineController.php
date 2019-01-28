<?php

namespace Tmtfactory\PrintingOmsBundle\Controller\RestAPI;


use League\Tactician\CommandBus;

use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Controller\Annotations as Rest;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;

use Tmtfactory\PrintingOmsBundle\Repository\OrderLine\IOrderLineRepository;
use Tmtfactory\PrintingOmsBundle\Command\ChangeOrderLineStatusCommand;
use Tmtfactory\PrintingOmsBundle\Repository\Order\IOrderRepository;

class OrderLineController extends AbstractFOSRestController
{
    /**
     * @var IOrderRepository
     */
    private $orderRepository;

    /**
     * @var IOrderLineRepository
     */
    private $orderLineRepository;

    /**
     * OrderLineController constructor.
     * @param IOrderRepository $orderRepository
     * @param IOrderLineRepository $orderLineRepository
     */
    public function __construct(
        IOrderRepository $orderRepository,
        IOrderLineRepository $orderLineRepository
    ){
        $this->orderRepository = $orderRepository;
        $this->orderLineRepository = $orderLineRepository;
    }

    /**
     * Get Order Lines
     *
     * @Rest\Route("/order/{orderId}/orderline")
     *
     * @param integer $orderId
     * @return Response
     */
    public function getOrderlineAction($orderId)
    {
        if (is_null($orderId)) {
            throw new \InvalidArgumentException('Order Id must be informed');
        }

        $orderEntity = $this->orderRepository->findById($orderId);

        if (is_null($orderEntity)) {
            throw new ResourceNotFoundException("Order with id $orderId does not exist");
        }

        $response = $orderEntity->getOrderLines();

        $view = new View($response);
        return $this->handleView($view);
    }

    /**
     * Put Order Lines
     *
     * @Rest\Route("/orderline/{orderLineId}/status/{statusId}")
     *
     * @param integer $orderLineId
     * @param integer $statusId
     * @param CommandBus $commandBus
     *
     * @return Response
     */
    public function putOrderlineAction($orderLineId, $statusId, CommandBus $commandBus)
    {
        if (is_null($orderLineId)) {
            throw new \InvalidArgumentException('Order Line Id must be informed');
        }

        $statuses = $this->orderRepository->getAllStatus();
        if (!in_array($statusId, $statuses)) {
            throw new ResourceNotFoundException("Status with id $statusId does not exist");
        }

        $orderLine = $this->orderLineRepository->findById($orderLineId);

        $command = new ChangeOrderLineStatusCommand($orderLine, $statusId);
        $commandBus->handle($command);

        $order = $this->orderRepository->findByOrderLineId($orderLineId);

        $view = new View($order);
        return $this->handleView($view);
    }
}
